function drawHud() {
  ctx.fillStyle = "#000000";
  ctx.drawImage(iconBackground,480,20);
  ctx.drawImage(iconBackground,570,20);
  ctx.drawImage(iconBackground,640,20);
  ctx.drawImage(iconBackground,730,20);
  ctx.drawImage(iconBackground,800,20);
  ctx.drawImage(iconBackground,870,20);
  ctx.drawImage(iconBackground,940,20);
  ctx.drawImage(monsterLeftArmDetatched,738,28,48,48);
  if (!monster.limbs[0].attached) {
    ctx.fillStyle = "rgba(46, 46, 46, 0.52)";
    ctx.fillRect(730,20,64,64);
  }
  ctx.drawImage(monsterRightArmDetatched,808,28,48,48);
  if (!monster.limbs[1].attached) {
    ctx.fillStyle = "rgba(46, 46, 46, 0.52)";
    ctx.fillRect(800,20,64,64);
  }
  ctx.drawImage(monsterLeftLegDetatched,878,28,48,48);
  if (!monster.limbs[2].attached) {
    ctx.fillStyle = "rgba(46, 46, 46, 0.52)";
    ctx.fillRect(870,20,64,64);
  }
  ctx.drawImage(monsterRightLegDetatched,948,28,48,48);
  if (!monster.limbs[3].attached) {
    ctx.fillStyle = "rgba(46, 46, 46, 0.52)";
    ctx.fillRect(940,20,64,64);
  }
  ctx.drawImage(monsterLeftEye,578,28,48,48);
  if (!monster.limbs[4].attached) {
    ctx.fillStyle = "rgba(46, 46, 46, 0.52)";
    ctx.fillRect(570,20,64,64);
  }
  ctx.drawImage(monsterRightEye,648,28,48,48);
  if (!monster.limbs[5].attached) {
    ctx.fillStyle = "rgba(46, 46, 46, 0.52)";
    ctx.fillRect(640,20,64,64);
  }
  ctx.drawImage(recall,480,20,64,64);
  ctx.drawImage(letters,452,6,562,204);

  ctx.fillStyle="#484848";
  ctx.fillStyle="#000000";
  ctx.fillRect(5, 22, 460, 58);
  ctx.drawImage(spr_bloodMeter,(bloodCount%16*600),0,450,48,10, 27, 450, 48);
  ctx.fillRect(460, 27, -450 * ((health.max - health.value) / health.max), 48);
  ctx.fillStyle = "#000000";
  ctx.fillRect(5, 100, 290, 32);
  ctx.fillStyle = "#616060";
  ctx.fillRect(10, 106, volume, 20);
  ctx.drawImage(soundIcon, 300, 100);
}
