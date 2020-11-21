importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.precaching.precacheAndRoute([
    {url: "/", revision: 1},
    {url: "/index.html", revision: 1},
    {url: "/nav.html", revision: 1},
    {url: "/pages/home.html", revision: 1},
    {url: "/pages/contact.html", revision: 1},
    {url: "/pages/about.html", revision: 1},
    {url: "/detail.html", revision: 1},
    {url: "/pages/myfavorite.html", revision: 1},
    {url: "/team.html", revision: 1},
    {url: "/js/nav.js", revision: 1},
    {url: "/js/api.js", revision: 1},
    {url: "/js/materialize.min.js", revision: 1},
    {url: "/js/bolaku_db.js", revision: 1},
    {url: "/js/idb/lib/idb.js", revision: 1},
    {url: "/js/listLeague.js", revision: 1},
    {url: "/js/detailLeague.js", revision: 1},
    {url: "/js/team.js", revision: 1},
    {url: "/js/favoriteTeams.js", revision: 1},
    {url: "/js/cek_sw.js", revision: 1},
    {url: "/css/materialize.min.css", revision: 1},
    {url: "/css/style.css", revision: 1},
    {url: "/favicon-32x32.png", revision: 1},
    {url: "/ball.png", revision: 1},
    {url: "/ball72.png", revision: 1},
    {url: "/ball96.png", revision: 1},
    {url: "/ball128.png", revision: 1},
    {url: "/ball144.png", revision: 1},
    {url: "/ball192.png", revision: 1},
    {url: "/ball256.png", revision: 1},
    {url: "/ball384.png", revision: 1},
    {url: "/ball512.png", revision: 1},
    {url: "/profile.jpeg", revision: 1},
    {url: "/img/2002.png", revision: 1},
    {url: "/img/2003.png", revision: 1},
    {url: "/img/2014.png", revision: 1},
    {url: "/img/2015.png", revision: 1},
    {url: "/img/2019.png", revision: 1},
    {url: "/img/2021.png", revision: 1},
    {url: "/manifest.json", revision: 1},
],
{
    ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('https://crests.football-data.org/'),
    workbox.strategies.cacheFirst({
        cacheName: 'bagde-team',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);


// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images-two',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 200,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);



self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  