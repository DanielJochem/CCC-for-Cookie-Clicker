// if you insist.. here is the formula
Math.round(((Game.goldenCookie.time-Game.goldenCookie.minTime)/(Game.goldenCookie.maxTime-Game.goldenCookie.minTime)*300) + 150)
 
// this is what Orteil uses to find out when to spawn a GC
if (Game.goldenCookie.toDie==0 && Game.goldenCookie.life<=0 && Math.random()<Math.pow(Math.max(0,(Game.goldenCookie.time-Game.goldenCookie.minTime)/(Game.goldenCookie.maxTime-Game.goldenCookie.minTime)),6)) Game.goldenCookie.spawn();
 
 
 // Autobuy buildings script
var oldOnload = window.onload;
window.onload = function () {
    oldOnload();
    var script = document.createElement('script');
    script.setAttribute('src', 'https://gist.github.com/DanielJochem/6930842/raw');
    document.body.appendChild(script);
}

// end Autobuy buildings script

// Will put calcCPS script here when done
// Also will put numBeautify script here when done

setTimeout(doSomething, 1000);

function doSomething() {
    var element = document.getElementById('particle0');
    if (typeof (element) != 'undefined' && element != null) {

        (function () {
            var options = {
                panelId: 'cookie-cheater',
                intervalDelay: 1,
                longDelay: 250,
                buttons: {
                    'bigCookie': {
                        label: 'Autoclick Big Cookie',
                        action: function () {
                            toggleAutoAction('bigCookie', function () {
                                Game.ClickCookie();
                            })
                        }
                    },
                    'autoGoldenCookie': {
                        label: 'Autoclick Golden Cookie',
                        action: function () {
                            toggleAutoAction('autoGoldenCookie', function () {
                                if (Game.goldenCookie.life >= 0 && (Game.frenzy <= 0 || Game.frenzyPower < 2 || Game.goldenCookie.chain > 0)) {
                                    Game.goldenCookie.click();
                                }
                            })
                        }
                    },
                    'spawnGoldenCookie': {
                        label: 'Spawn One GC',
                        action: function () {
                            Game.goldenCookie.life = 0;
                            Game.goldenCookie.time = Game.goldenCookie.minTime;
                            Game.goldenCookie.spawn();
                        }
                    },
                    'autoSpawnGoldenCookie': {
                        label: 'Autospawn GCs',
                        action: function () {
                            toggleAutoAction('autoSpawnGoldenCookie', function () {
                                options.buttons['spawnGoldenCookie'].action();
                            })
                        }
                    },
                    'autoBuyUpgrades': {
                        label: 'Autobuy Upgrades',
                        action: function () {
                            toggleAutoAction('autoBuyUpgrades', function () {
                                buyUpgrades();
                            })
                        }
                    },
                    'showGoldenCookieDelay': {
                        label: 'Display GC Delay In Title',
                        action: function () {
                            toggleAutoAction('showGoldenCookieDelay', function () {
                                document.title = '(' + Math.floor(Game.goldenCookie.delay / Game.fps) + ' s) ' + Beautify(Game.cookies) + ' ' + (Game.cookies == 1 ? 'cookie' : 'cookies')
                            })
                        }
                    },
/*   'numberBeautify': {
                label: 'Beautify Numbers',
                action: function () {
                    numBeautify();
                }
            },
            'calculateCPS': {
                label: 'AutoNext',
                action: function () {
                    calcCPS();
                }
            }, */
                    'soundGC': {
                        label: 'Play Sound When GC Spawns',
                        action: function () {
                            toggleAutoAction('soundGC', function () {
                                if (Math.floor(Game.goldenCookie.delay / Game.fps) <= 0) {
                                    theSound.play();
                                }
                            })
                        }
                    },
                    'optimalWin': {
                        label: 'Autowin',
                        action: function () {
                            toggleAutoAction('optimalWin', function () {

                                /* auto-click big cookie and auto-spawn/auto-click golden cookie */
                                Game.ClickCookie();
                                Game.goldenCookie.life = 0;
                                Game.goldenCookie.time = Game.goldenCookie.minTime;
                                Game.goldenCookie.spawn();
                                if (Game.goldenCookie.life >= 0 && (Game.frenzy <= 0 || Game.frenzyPower < 2 || Game.goldenCookie.chain > 0)) {
                                    Game.goldenCookie.click();
                                }
                                
                                /* vars */
                                var cursorProduct = Game.Objects.Cursor;
                                var antimatterCondenser = Game.ObjectsById[Game.ObjectsById.length - 1];
                                var cursUpgrade;

                                /* buy 10 cursors */
                                if (cursorProduct.amount < 10) {
                                    cursorProduct.buy();
                                    return;
                                }

                                /* buy a bunch of cursor upgrades */
                                cursUpgrade = Game.UpgradesById[0];
                                if (!cursUpgrade.bought && cursUpgrade.unlocked) {
                                    cursUpgrade.buy();
                                    return;
                                }
                                cursUpgrade = Game.UpgradesById[1];
                                if (!cursUpgrade.bought && cursUpgrade.unlocked) {
                                    cursUpgrade.buy();
                                    return;
                                }
                                cursUpgrade = Game.UpgradesById[2];
                                if (!cursUpgrade.bought && cursUpgrade.unlocked) {
                                    cursUpgrade.buy();
                                    return;
                                }
                                cursUpgrade = Game.UpgradesById[75];
                                if (!cursUpgrade.bought && cursUpgrade.unlocked) {
                                    cursUpgrade.buy();
                                    return;
                                }
                                cursUpgrade = Game.UpgradesById[76];
                                if (!cursUpgrade.bought && cursUpgrade.unlocked) {
                                    cursUpgrade.buy();
                                    return;
                                }

                                /* buy upgrades if they are available in store and < 1/4 anti-matter condenser price */
                                if (Game.UpgradesInStore.length > 0 && Game.UpgradesInStore[0].basePrice < antimatterCondenser.price / 4) {
                                    buyUpgrades();
                                }

                                /* prioritize anti-matter condensers over everything */
                                antimatterCondenser.buy();

                            })
                        }
                    },
                }
            };

            addStyleSheet();
            addPanel();
            for (var name in options.buttons) {
                if (!options.buttons[name]) {
                    return;
                }
                addButton(name, options.buttons[name].label, options.buttons[name].action);
            }

            function buyUpgrades() {
                for (i = 0; i < Game.UpgradesById.length; i++) {
                    if (i === 69 || i === 74 || i === 79 || i === 83 || i === 84 || i === 85 || i === 91 || i === 124 || i === 142) {
                        continue;
                    } else {
                        Game.UpgradesById[i].buy();
                    }
                }
            }

            function autoAction(name, action) {
                if (!options.buttons[name]) {
                    return;
                }
                if (name == 'bigCookie') {
                    options.buttons[name].interval = setInterval(action, options.intervalDelay);
                } else {
                    options.buttons[name].interval = setInterval(action, options.longDelay);
                }
            }

            function stopAutoAction(name) {
                clearInterval(options.buttons[name].interval);
            }

            function toggleAutoAction(name, action) {
                if (!options.buttons[name].on) {
                    autoAction(name, action);
                    options.buttons[name].on = true;
                    options.buttons[name].element.className = 'active';
                } else {
                    stopAutoAction(name);
                    options.buttons[name].on = false;
                    options.buttons[name].element.className = '';
                }
            }

            function addPanel() {
                if (document.getElementById(options.panelId)) {
                    document.getElementById(options.panelId).remove();
                }
                options.panel = document.createElement("div");
                options.panel.id = options.panelId;
                document.body.appendChild(options.panel);
            }

            function addButton(name, label, action) {
                if (!options.buttons[name]) {
                    return;
                }
                options.buttons[name].element = document.createElement('button');
                options.buttons[name].element[(typeof document.body.style.WebkitAppearance == "string") ? "innerText" : "innerHTML"] = label;
                options.buttons[name].element.addEventListener('click', action);
                options.panel.appendChild(options.buttons[name].element);
            }

            function addStyleSheet() {
                var stylesClassName = options.panelId + '-styles';
                var styles = document.getElementsByClassName(stylesClassName);
                if (styles.length <= 0) {
                    styles = document.createElement('style');
                    styles.type = 'text/css';
                    styles.className += ' ' + stylesClassName;
                    document.body.appendChild(styles);
                }

                var css = '#' + options.panelId + '{position:fixed;top:0;right:0;padding:5px;z-index:9999;}#' + options.panelId + ' button{margin-left: 5px; font-family:\"Kavoon\"; color:#CD0000;}#' + options.panelId + ' button.active:after{content:"*";color:red;}';
                styles[(typeof document.body.style.WebkitAppearance == "string") ? "innerText" : "innerHTML"] = css;
            }

            var delta = document.getElementById('javascriptError');
            delta.parentNode.removeChild(delta);
            var link = document.createElement('a');
            link.setAttribute('href', 'http://orteil.dashnet.org/experiments/cookie/');
            link.target = 'blank';
            link.appendChild(
            document.createTextNode('Cookie Clicker Classic'));
            var add = document.getElementsByTagName('div')[2];
            add.insertBefore(document.createTextNode('| '), add.lastChild);
            add.insertBefore(link, add.lastChild);

            if (window.location == "http://orteil.dashnet.org/cookieclicker/") {
                var linkb = document.createElement('a');
                linkb.setAttribute('href', 'beta');
                linkb.target = 'blank';
                linkb.appendChild(
                document.createTextNode('Try the beta!'));
                var addb = document.getElementsByTagName('div')[2];
                addb.insertBefore(document.createTextNode(' | '), add.lastChild);
                addb.insertBefore(linkb, add.lastChild);
            } else {
                var linkc = document.createElement('a');
                linkc.setAttribute('href', '../');
                linkc.target = 'blank';
                linkc.appendChild(
                document.createTextNode('Live version'));
                var addc = document.getElementsByTagName('div')[2];
                addc.insertBefore(document.createTextNode(' | '), add.lastChild);
                addc.insertBefore(linkc, add.lastChild);
            }
            var del = document.getElementById('links');
            del.parentNode.removeChild(del);
            return;

            var goldenCookieRawSound = "http://dc144.4shared.com/img/926529133/bd50c11b/dlink__2Fdownload_2FiEhv4VrW_3Ftsid_3D20130907-80140-a0150fa0/preview.mp3";
            var theSound = new Audio(goldenCookieRawSound);

        })();

    } else {
        setTimeout(doSomething, 1000);
    }
}
