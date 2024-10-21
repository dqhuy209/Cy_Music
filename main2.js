let songs = [
  {
    name: "Sài Gòn Hôm Nay Mưa",
    singer: "JSOL ft. Hoàng Duyên「Cukak Remix」",
    path: "./assets/music/song1.mp3",
    image: "./assets/img/song1.jpg",
  },
  {
    name: "Forget Me Now",
    singer: "Fishy ft. Trí Dũng「Cukak Remix」",
    path: "./assets/music/song2.mp3",
    image: "./assets/img/song2.jpg",
  },
  {
    name: "Anh Sẽ Đón Em",
    singer: "Nguyên ft. Trang「Cukak Remix 」",
    path: "./assets/music/song3.mp3",
    image: "./assets/img/song3.jpg",
  },
  {
    name: "Thích Em Hơi Nhiều",
    singer: "Wren Evans「Cukak Remix」",
    path: "./assets/music/song4.mp3",
    image: "./assets/img/song4.jpg",
  },
  {
    name: "Tell Ur Mom II",
    singer: "Winno ft. Heily「Cukak Remix」",
    path: "./assets/music/song5.mp3",
    image: "./assets/img/song5.jpg",
  },
  {
    name: "Yêu Đừng Sợ Đau",
    singer: "Ngô Lan Hương「Cukak Remix」",
    path: "./assets/music/song6.mp3",
    image: "./assets/img/song6.jpg",
  },
  {
    name: "Có Hẹn Với Thanh Xuân",
    singer: "Monstar「Cukak Remix」",
    path: "./assets/music/song7.mp3",
    image: "./assets/img/song7.jpg",
  },
  {
    name: "Đường Tôi Chở Em Về",
    singer: "Buitruonglinh「Cukak Remix」",
    path: "./assets/music/song8.mp3",
    image: "./assets/img/song8.jpg",
  },
];
let currentIndex = 0;

function render() {
  const htmls = songs.map((song, index) => {
    return `
       <div class="song ${
         index === currentIndex ? "active" : ""
       }" data-index="${index}">
         <div class="thumb" style="background-image: url('${
           song.image
         }')"></div>
         <div class="body">
           <h3 class="title">${song.name}</h3>
           <p class="author">${song.singer}</p>
         </div>
         <div class="option">
           <i class="fas fa-ellipsis-h"></i>
         </div>
       </div>`;
  });
  playlist.innerHTML = htmls.join("");
}
render();
