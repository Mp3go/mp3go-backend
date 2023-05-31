// const axios = require("axios");
// require("dotenv").config();
// const db = require("./config/dbconfig");
// const Music = require("./models/music");
// const Filter = require("./models/filter");
// db().then(async () => {
//   const findDuplicates = (arr) =>
//     arr.filter((item, index) => arr.indexOf(item) !== index);
//   let artists = [];
//   let language = [];
//   await Music.find({}).then((result) => {
//     result.forEach((data) => {
//       if (!(data.language in language)) {
//         language.push(data.language);
//       }
//       data.artist.forEach((a) => {
//         artists.push(a);
//       });
//     });
//   });
//   commonArtist = findDuplicates(artists);
//   uniq = [...new Set(commonArtist)];
//   console.log(uniq);
//   let languages = [
//     {
//       name: "Hindi",
//       img: "https://img.wynk.in/unsafe/248x248/filters:no_upscale():strip_exif():format(webp)/http://s3.ap-south-1.amazonaws.com/discovery-prod-arsenal/arsenal/artworks/64183928c91f9d41080a2364/COLLECTION_464298048435.png",
//     },
//     {
//       name: "English",
//       img: "https://images.saymedia-content.com/.image/t_share/MTg1ODQ2NjYxNzQ0OTYwNjQx/popular-english-songs-top-300-best-songs-of-all-time.png",
//     },
//     {
//       name: "Punjabi",
//       img: "https://static.theprint.in/wp-content/uploads/2022/06/PUNJABI-SONGS.jpg",
//     },
//     {
//       name: "Tamil",
//       img: "https://i1.sndcdn.com/avatars-Lse3pSGPUzz7KJzL-bPTzpg-t500x500.jpg",
//     },
//     {
//       name: "Telugu",
//       img: "https://img.wynk.in/unsafe/200x200/filters:no_upscale():strip_exif():format(jpg)/h[…]rtworks/64746b26e7682d632bfe0f0d/COLLECTION_242012020291446.png",
//     },
//     {
//       name: "Marathi",
//       img: "https://raag.fm/image/250/1065251/Classical-Songs-Marathi-Films-Madhubala-Chawla.jpg",
//     },
//     {
//       name: "Gujarati",
//       img: "https://img.wynk.in/unsafe/200x200/filters:no_upscale():strip_exif():format(jpg)/h[…]wynk-music-cms/music/1545383303/srch_pplmumbai_INR271801627.jpg",
//     },
//     {
//       name: "Bengali",
//       img: "https://images.hungama.com/c/1/1fd/9aa/66932629/66932629_200x200.jpg",
//     },
//     {
//       name: "Kannada",
//       img: "https://yt3.googleusercontent.com/lm4HsGyBav-xhHBT-c9iGEpFuunI74Cr5hL5gJ3jkbnHmLPXbDLVa1oIZ1Ckdkp62pOywFj4chM=s900-c-k-c0x00ffffff-no-rj",
//     },
//     {
//       name: "Assamese",
//       img: "https://i.pinimg.com/originals/76/66/0a/76660a107e0cd2e12a3e6263a8779206.jpg",
//     },
//     {
//       name: "Bhojpuri",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-p7Qx--iUdMlaHwzruIXVmioamdfTQRr74w&usqp=CAU",
//     },
//     {
//       name: "Haryana",
//       img: "https://yt3.googleusercontent.com/ytc/AGIKgqMGMaPTk7NxSINi2quE772gyca9biGolTIb7yk=s900-c-k-c0x00ffffff-no-rj",
//     },
//     {
//       name: "Odia",
//       img: "https://images.hungama.com/c/1/9da/226/49751231/49751231_300x300.jpg",
//     },
//     {
//       name: "Rajasthani",
//       img: "https://images.hungama.com/c/1/08a/74d/51857934/51857934_300x300.jpg",
//     },
//     {
//       name: "Instrumental",
//       img: "https://myburbank.com/wp-content/uploads/2018/02/image001.png",
//     },
//     {
//       name: "Malayalam",
//       img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fopen.spotify.com%2Falbum%2F4RhPUUpql3ckuCz4KcbGV9&psig=AOvVaw0Cxh6yeRzqq1_M0kkS5erA&ust=1685530490398000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMiSv9fwnP8CFQAAAAAdAAAAABAP",
//     },
//   ];

//   const data = new Filter({
//     languages: languages,
//     artists: uniq,
//   });

//   data.save().then(() => {
//     console.log("Data Saved");
//   });

//   // var duplicatesIds = [];
//   // Music.aggregate(
//   //   [
//   //     {
//   //       $group: {
//   //         _id: {
//   //           name: "$name",
//   //         },
//   //         dups: {
//   //           $addToSet: "$_id",
//   //         },
//   //         count: {
//   //           $sum: 1,
//   //         },
//   //       },
//   //     },
//   //     {
//   //       $match: {
//   //         count: {
//   //           $gt: 1,
//   //         },
//   //       },
//   //     },
//   //   ],
//   //   {
//   //     allowDiskUse: true,
//   //   }
//   // ).then((result) => {
//   //   result.forEach((doc) => {
//   //     doc.dups.shift();
//   //     doc.dups.forEach(function (dupId) {
//   //       duplicatesIds.push(dupId);
//   //     });
//   //   });
//   //   console.log(duplicatesIds);
//   //   duplicatesIds.forEach((data) => {
//   //     Music.findByIdAndDelete(data).then((res) => {
//   //       console.log("result Deleted");
//   //     });
//   //   });
//   // });
// });

// // axios
// //   .get("https://saavn.me/modules?language=odia")
// //   .then(async (response) => {
// //     const output = response.data.data.albums;
// //     var a = 0;
// //     for (let i of output) {
// //       searchquery = i.name.replaceAll(" ", "+");
// //       await axios
// //         .get(
// //           `https://saavn.me/search/songs?query=${searchquery}&page=1&limit=2`
// //         )
// //         .then(async (response) => {
// //           const output = response.data.data.results[0];
// //           var lyric = "No Lyric Available";
// //           var price = [400, 500, 550, 600, 900, 800];
// //           if (output.hasLyrics === "true") {
// //             await axios
// //               .get(`https://saavn.me/lyrics?id=${output.id}`)
// //               .then((response) => {
// //                 lyric = response.data.data.lyrics;
// //               })
// //               .catch((err) => {
// //                 console.log("Error in Request");
// //               });
// //           }
// //           const data = new Music({
// //             name: output.name,
// //             duration: (parseInt(output.duration) / 60).toFixed(1),
// //             year: parseInt(output.year),
// //             artist: output.primaryArtists.split(", "),
// //             language:
// //               output.language.charAt(0).toUpperCase() +
// //               output.language.slice(1),
// //             img: output.image[2].link,
// //             price: price[Math.floor(Math.random() * price.length)],
// //             lyric: lyric,
// //           });
// //           await data.save().then((response) => {
// //             console.log("Saved in Database");
// //           });
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //       a += 1;
// //       if (a == 10) {
// //         break;
// //       }
// //     }
// //   })
// //   .catch(function (error) {
// //     // if not successful then log the error
// //     console.log(error);
// //   });
