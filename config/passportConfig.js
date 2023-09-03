const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

// Inisialisasi Passport.js hanya jika belum diinisialisasi sebelumnya
if (!passport._strategy("facebook")) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: "YOUR_FACEBOOK_APP_ID",
        clientSecret: "YOUR_FACEBOOK_APP_SECRET",
        callbackURL: "http://localhost:5000/api/auth/facebook/callback",
        profileFields: ["id", "displayName", "emails", "picture.type(large)"],
      },
      (accessToken, refreshToken, profile, done) => {
        // Di sini Anda dapat menyimpan data pengguna ke database atau melakukan operasi lainnya sesuai kebutuhan
        // Contoh sederhana, kembalikan data profil sebagai user object
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
        };
        return done(null, user);
      }
    )
  );
}

module.exports = passport;
