function drawFog() {
    // Create a canvas that we will use as a mask
    var maskCanvas = document.createElement('canvas');
    // Ensure same dimensions
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    var maskCtx = maskCanvas.getContext('2d');

    // This color is the one of the filled shape
    let pattern = ctx.createPattern(brick, 'repeat');
    let patternDark = ctx.createPattern(brickDark, 'repeat');
    maskCtx.fillStyle = patternDark;
    //maskCtx.fillStyle = pattern;
    // Fill the mask
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    // Set xor operation
    maskCtx.globalCompositeOperation ='destination-out'; //destination-out
    visionItems = []
    if (monster.limbs[4].x != null) {
      visionItems.push(monster.limbs[4]);
    }
    if (monster.limbs[5].x != null) {
      visionItems.push(monster.limbs[5]);
    }
    if (visionItems.length != 2) {
      visionItems.push(monster);
    }
    visionItems.forEach(visionItem => {
    let xmonster = visionItem.x + (visionItem.width / 2);
    let ymonster = visionItem.y + (visionItem.width / 2);
    let closestToPlayer = [];
    for (i = 0; i < currentLevel.length; i++) {
        for (j = 0; j < currentLevel[i].length; j++) {
            let solid = false;
            if (currentLevel[i][j] == 1) {
              solid = true;
            }
            if (currentLevel[i][j].name == "door") {
              if (!currentLevel[i][j].isOpen()) {
                solid = true;
              }
            }
            if (solid) {
                let clx = (i * tileSize) + (tileSize / 2);
                let cly = (j * tileSize) + (tileSize / 2);
                let proximity = Math.sqrt(Math.pow((clx - xmonster), 2) + Math.pow((cly - ymonster), 2));
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
        let angle2Point = Math.atan2((closestToPlayer[i].y - ymonster), (closestToPlayer[i].x - xmonster));
        let angleMin = angle2Point - angleWidth;
        let angleMax = angle2Point + angleWidth;
        let rotation = true;
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
        if (angleMin > angleMax) {
            angleMax += 2 * Math.PI;
        }
        let angle = {
            min: angleMin,
            max: angleMax,
            rot: rotation
        };

        if (blackListedAngle.length == 0) {
            maskCtx.beginPath();
            maskCtx.moveTo(xmonster, ymonster);
            maskCtx.arc(xmonster, ymonster, radius, 0, 2 * Math.PI, true);
            maskCtx.lineTo(xmonster, ymonster);
            maskCtx.fill();
        }
        else if (blackListedAngle.length == 1) {
            maskCtx.beginPath();
            maskCtx.moveTo(xmonster, ymonster);
            maskCtx.arc(xmonster, ymonster, radius, blackListedAngle[0].min, blackListedAngle[0].max, true);
            maskCtx.lineTo(xmonster, ymonster);
            maskCtx.fill();
        } else {
            maskCtx.beginPath();
            maskCtx.moveTo(xmonster, ymonster);
            for (j = blackListedAngle.length - 1; j > 0; j--) {
                    maskCtx.arc(xmonster, ymonster, radius, blackListedAngle[j].min, blackListedAngle[j - 1].max, true);
                    maskCtx.lineTo(xmonster, ymonster);
            }
            maskCtx.arc(xmonster, ymonster, radius, blackListedAngle[0].min, blackListedAngle[blackListedAngle.length - 1].max, true);
            maskCtx.lineTo(xmonster, ymonster);

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
            let nextIndex = j + 1;
            if (blackListedAngle.length == 1) {
                break;
            }
            if (nextIndex == blackListedAngle.length) {
                nextIndex = 0;
            }
            if (blackListedAngle[j].max > blackListedAngle[nextIndex].min && blackListedAngle[j].max < blackListedAngle[nextIndex].max) {
                blackListedAngle[j].max = blackListedAngle[nextIndex].max;
                blackListedAngle.splice(nextIndex, 1);
                j = -1;
            } else if (blackListedAngle[j].max - 2 * Math.PI > blackListedAngle[nextIndex].min) {
                let maxVal = (2 * Math.PI) + blackListedAngle[nextIndex].max;;
                if (maxVal < blackListedAngle[j].max) {
                    maxVal = blackListedAngle[j].max;
                }
                blackListedAngle[j].max = maxVal;
                //if (blackListedAngle[j].max - 2 * Math.PI < blackListedAngle[j].min) {
                //    blackListedAngle[j].max = 2 * Math.PI;
                //    blackListedAngle[j].min = 0;
                //}
                blackListedAngle.splice(nextIndex, 1);
                j = -1;
            }
             else if (blackListedAngle[j].max > blackListedAngle[nextIndex].max && blackListedAngle[j].min < blackListedAngle[nextIndex].min) {
                blackListedAngle.splice(nextIndex, 1);
                j = -1;
            }
        }
    }
  })
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.drawImage(maskCanvas, 0, 0);
}
