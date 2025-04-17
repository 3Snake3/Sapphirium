const statuses = require("SappStatuses");

const creotitePrecipitation = extend(RainWeather, "creotite-precipitation", {});

const ledonitePrecipitation = extend(RainWeather, "ledonite-precipitation", {
    status: statuses.superFreezing,
    statusDuration: 120,
});

const radioactiveFog = extend(ParticleWeather, "radioactive-fog", {
    duration: 17 * Time.toMinutes
});

const weatherBullet = extend(BasicBulletType, {
    width: 12,
    height: 17,
    speed: 5,
    damage: 33,
    lifetime: 20
});

const bulletWeather = extend(ParticleWeather, "bullet-weather", {
    duration: 15 * Time.toMinutes,
    noiseLayers: 3,
    noiseLayerSclM: 0.8,
    noiseLayerAlphaM: 0.7,
    noiseLayerSpeedM: 2,
    baseSpeed: 0.05,
    noiseColor: Color.white,
    noiseScale: 1100,
    noisePath: "fog",
    drawParticles: false,
    drawNoise: true,
    useWindVector: false,
    xspeed: 1,
    yspeed: 0.01,
    opacityMultiplier: 0.47,
    creload: 0,
    update(state) {
        this.super$update(state);
        const wShootX = (Vars.world.tiles.width * Vars.tilesize + 40) * -1;
        this.creload++;
        if (this.creload == 420) {
            let randSpawn = Mathf.random(6, 12);
            let wShootY = Mathf.random((Vars.world.tiles.height * Vars.tilesize));
            let wVelocityScl = Mathf.random(5.8, 6.2);
            let wLifetimeScl = (Vars.world.tiles.height * Vars.tilesize) / (wVelocityScl - weatherBullet.drag * ((Vars.world.tiles.height * Vars.tilesize) / wVelocityScl / 2));
            let wAngle = Mathf.random(0, 8);
            
            if (Mathf.random(0, 1) == 1) wAngle *= -1;  // 50 : 50 chance change wAngle to negative value

            weatherBullet.create(null, Team.derelict, wShootX, wShootY, wAngle, wVelocityScl, wLifetimeScl);
            this.creload = 0;
        }
    }
});

module.exports = {
    creotitePrecipitation: creotitePrecipitation,
    ledonitePrecipitation: ledonitePrecipitation,
    radioactiveFog: radioactiveFog
}
