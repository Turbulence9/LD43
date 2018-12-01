function drawFog() {
    // Create a canvas that we will use as a mask
    var maskCanvas = document.createElement('canvas');
    // Ensure same dimensions
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    var maskCtx = maskCanvas.getContext('2d');

    // This color is the one of the filled shape
    maskCtx.fillStyle = "gray";
    // Fill the mask
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    // Set xor operation
    maskCtx.globalCompositeOperation = 'destination-out';
    let maxVision = 350;
    let closestToPlayer = [];
    for (i = 0; i < currentLevel.length; i++) {
        for (j = 0; j < currentLevel[i].length; j++) {
            if (currentLevel[i][j]) {
                let clx = (i * tileSize) + (tileSize / 2);
                let cly = (j * tileSize) + (tileSize / 2);
                let proximity = Math.sqrt(Math.pow((clx - monster.x), 2) + Math.pow((cly - monster.y), 2));
                let entry = {
                    x: clx,
                    y: cly,
                    prox: proximity
                };
                if (entry.prox < maxVision) {
                    closestToPlayer.push(entry);
                }
            }
        }
    }
    let entry = {
        x: 0,
        y: 0,
        prox: maxVision
    };
    closestToPlayer.push(entry);
    closestToPlayer.sort(function (a, b) {
        if (a.prox > b.prox)
            return 1;
        if (a.prox < b.prox)
            return -1;
        return 0;
    });
    //blackListedAngle is used to keep track of what parts of the vision will be not seen
    let blackListedAngle = [];
    for (i = 0; i < closestToPlayer.length; i++) {
        let radius = closestToPlayer[i].prox;
        let angleWidth = Math.atan2((tileSize / 1.42), radius); //tileSize / 2
        let angle2Point = Math.atan2((closestToPlayer[i].y - monster.y), (closestToPlayer[i].x - monster.x));
        let angleMin = angle2Point - angleWidth;
        let angleMax = angle2Point + angleWidth;
        if (angleMin < 0) {
            angleMin += 2 * Math.PI;
        }
        if (angleMin > 2 * Math.PI) {
           angleMin -= 2 * Math.PI;
        }
        if (angleMax < 0) {
            angleMax += 2 * Math.PI;
        }
        if (angleMax > 2 * Math.PI) {
            angleMax -= 2 * Math.PI;
        }
        let angle = {
            min: angleMin,
            max: angleMax,
            rot: 0
        };

        if (blackListedAngle.length == 0) {
            maskCtx.beginPath();
            maskCtx.moveTo(monster.x, monster.y);
            maskCtx.arc(monster.x, monster.y, radius, 0, 2 * Math.PI, true);
            maskCtx.lineTo(monster.x, monster.y);
            //maskCtx.moveTo(monster.x, monster.y);
            //maskCtx.fillStyle = "yellow";
            maskCtx.fill();
        }
        else if (blackListedAngle.length == 1) {
            maskCtx.beginPath();
            maskCtx.moveTo(monster.x, monster.y);
            maskCtx.arc(monster.x, monster.y, radius, blackListedAngle[0].min, blackListedAngle[0].max, true);
            maskCtx.lineTo(monster.x, monster.y);
           // maskCtx.moveTo(monster.x, monster.y);
           // maskCtx.fillStyle = "yellow";
            maskCtx.fill();
        } else {
        //if (blackListedAngle.length > 1) {
            maskCtx.beginPath();
            maskCtx.moveTo(monster.x, monster.y);
            for (j = 0; j < blackListedAngle.length - 1; j++) {
                maskCtx.arc(monster.x, monster.y, radius, blackListedAngle[j].max, blackListedAngle[j + 1].min, false);
                maskCtx.lineTo(monster.x, monster.y);
            }
            maskCtx.arc(monster.x, monster.y, radius, blackListedAngle[blackListedAngle.length - 1].max, blackListedAngle[0].min, false);
            maskCtx.lineTo(monster.x, monster.y);
            //maskCtx.moveTo(monster.x, monster.y);
            //maskCtx.fillStyle = "yellow";
            maskCtx.fill();
        }
        blackListedAngle.push(angle);
        blackListedAngle.sort(function (a, b) {
            if (a.min > b.min)
                return 1;
            if (a.min < b.min)
                return -1;
            return 0;
        });
        for (j = 0; j < blackListedAngle.length; j++) {
            let currMax = blackListedAngle[j].max;
            let splice = false;
            let spliceIndex = 0;
            for (k = j + 1; k < blackListedAngle.length; k++) {
                if (currMax > blackListedAngle[k].min) {
                    if (currMax < blackListedAngle[k].max) {
                        currMax = blackListedAngle[k].max;
                    }
                    splice = true;
                    spliceIndex = k;
                }
            }
            if (splice) {
                blackListedAngle[j].max = currMax;
                blackListedAngle.splice(j + 1, spliceIndex - j);
            }
        }
    }
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(maskCanvas, 0, 0);
}