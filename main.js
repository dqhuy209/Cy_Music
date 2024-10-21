const player = document.querySelector(".player");
const cd = document.querySelector(".cd");
const heading = document.querySelector("header h2");
const cdThumb = document.querySelector(".cd-thumb");
const audio = document.querySelector("#audio");
const playBtn = document.querySelector(".btn-toggle-play");
const progress = document.querySelector("#progress");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");
const playlist = document.querySelector(".playlist");
const fileUpload = document.querySelector("#file-upload");
const progressContainer = document.querySelector(".progress-container");
const uploadForm = document.querySelector("#uploadForm");

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

// let currentIndex = 0;
// let isPlaying = false;
// function render() {
//   const htmls = songs.map((song, index) => {
//     return `
//       <div class="song ${
//         index === currentIndex ? "active" : ""
//       }" data-index="${index}">
//         <div class="thumb" style="background-image: url('${song.image}')"></div>
//         <div class="body">
//           <h3 class="title">${song.name}</h3>
//           <p class="author">${song.singer}</p>
//         </div>
//         <div class="option">
//           <i class="fas fa-ellipsis-h"></i>
//         </div>
//       </div>`;
//   });
//   playlist.innerHTML = htmls.join("");
// }

// function getCurrentSong() {
//   return songs[currentIndex];
// }

// function handleEvents() {
//   const cdWidth = cd.offsetWidth;

//   playBtn.onclick = function () {
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//   };

//   audio.onplay = function () {
//     isPlaying = true;
//     player.classList.add("playing");
//   };

//   audio.onpause = function () {
//     isPlaying = false;
//     player.classList.remove("playing");
//   };
//   // thanh progress
//   // ontimeupdate => sự kiện chạy liên tục bắt tgian thay đổi
//   // duration => thời gian tổng của bài hát
//   // currentTime => thời gian đã chạy của bài hát
//   //Tính độ rộng của bar => width / duration * currentTime = progressPercent
//   audio.ontimeupdate = function () {
//     if (audio.duration) {
//       const progressPercent = Math.floor(
//         (audio.currentTime / audio.duration) * 100
//       );
//       updateProgressBarBackground(progressPercent); // Cập nhật màu theo phần trăm

//       const progressBar = document.querySelector("#progress");
//       progressBar.style.width = `${progressPercent}%`;
//     }
//   };

//   const progressContainer = document.querySelector(".progress-container");

//   progressContainer.onclick = function (e) {
//     // set tọa độ theo chiều rộng của thanh chứa bar
//     const containerWidth = progressContainer.offsetWidth;
//     // Lấy tọa độ trục x khi ng dùng ấn vào
//     const clickX = e.offsetX;
//     const newTime = (clickX / containerWidth) * audio.duration;
//     audio.currentTime = newTime;
//   };
//   // Cập nhật kéo thả
//   function updateProgressBarBackground(progressPercent) {
//     progressContainer.style.background = `linear-gradient(to right, #ACA9BB ${progressPercent}%, #e0e0e0 ${progressPercent}%)`;
//   }

//   nextBtn.onclick = function () {
//     nextSong();
//     audio.play();
//     render();
//   };

//   prevBtn.onclick = function () {
//     prevSong();
//     audio.play();
//     render();
//   };

//   playlist.onclick = function (e) {
//     const songNode = e.target.closest(".song:not(.active)");
//     if (songNode || e.target.closest(".option")) {
//       if (songNode) {
//         currentIndex = Number(songNode.dataset.index);
//         loadCurrentSong();
//         render();
//         audio.play();
//       }
//     }
//   };
// }

// function loadCurrentSong() {
//   const currentSong = getCurrentSong();
//   heading.textContent = currentSong.name;
//   cdThumb.style.backgroundImage = `url('${currentSong.image}')`;
//   audio.src = currentSong.path;
// }

// function nextSong() {
//   currentIndex++;
//   if (currentIndex >= songs.length) {
//     currentIndex = 0;
//   }
//   loadCurrentSong();
// }

// function prevSong() {
//   currentIndex--;
//   if (currentIndex < 0) {
//     currentIndex = songs.length - 1;
//   }
//   loadCurrentSong();
// }

// function start() {
//   handleEvents();
//   loadCurrentSong();
//   render();
// }

// start();

const playerState = new Proxy(
  {
    currentIndex: 0,
    isPlaying: false,
  },
  {
    set(target, key, value) {
      target[key] = value;

      if (key === "currentIndex") {
        loadCurrentSong();
        render();
      }

      if (key === "isPlaying") {
        if (value) {
          audio.play();
        } else {
          audio.pause();
        }
        player.classList.toggle("playing", value);
      }

      return true;
    },
  }
);

function render() {
  const htmls = songs.map((song, index) => {
    return `
      <div class="song ${
        index === playerState.currentIndex ? "active" : ""
      }" data-index="${index}">
        <div class="thumb" style="background-image: url('${song.image}')"></div>
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
// Lấy bài hát hiện tại
function getCurrentSong() {
  return songs[playerState.currentIndex];
}

function handleEvents() {
  playBtn.onclick = function () {
    playerState.isPlaying = !playerState.isPlaying;
  };

  // Cập nhật khi phát nhạc
  audio.ontimeupdate = function () {
    if (audio.duration) {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      updateProgressBarBackground(progressPercent);
      progress.style.width = `${progressPercent}%`;
    }
  };
  //

  let isDragging = false;
  // progressContainer.onclick = function (e) {
  //   const containerWidth = progressContainer.offsetWidth;
  //   const clickX = e.offsetX;
  //   const newTime = (clickX / containerWidth) * audio.duration;
  //   audio.currentTime = newTime;
  // };
  // Nhấn vào
  progressContainer.onmousedown = function (e) {
    isDragging = true;
    updateProgress(e);
  };
  // Khi kéo chuột
  progressContainer.onmousemove = function (e) {
    if (isDragging) {
      updateProgress(e);
    }
  };
  // Khi thả chuột ra
  progressContainer.onmouseup = function () {
    isDragging = false;
  };
  // Khi rời chuột ra
  progressContainer.onmouseleave = function () {
    isDragging = false;
  };
  // Hàm cập nhật thanh progress và màu nền
  function updateProgress(e) {
    const containerWidth = progressContainer.offsetWidth;
    const clickX = e.offsetX; // Lấy tọa độ trục x khi nhấn vào
    const newTime = (clickX / containerWidth) * audio.duration; // Tính thời gian mới
    audio.currentTime = newTime; // Cập nhật thời gian bài hát

    // Tính toán phần trăm và cập nhật thanh progress
    const progressPercent = Math.floor((newTime / audio.duration) * 100);
    updateProgressBarBackground(progressPercent);
    progress.style.width = `${progressPercent}%`; // Cập nhật độ rộng của thanh progress
  }

  nextBtn.onclick = function () {
    nextSong();
  };

  prevBtn.onclick = function () {
    prevSong();
  };

  playlist.onclick = function (e) {
    const songNode = e.target.closest(".song:not(.active)");
    if (songNode) {
      playerState.currentIndex = Number(songNode.dataset.index);
    }
    playerState.isPlaying = true;
    audio.play();
  };
  // Toggle
  const toggleBtn = document.querySelector("#toggleUploadForm");
  toggleBtn.onclick = function () {
    if (uploadForm.style.display === "none") {
      uploadForm.style.display = "block";
    } else {
      uploadForm.style.display = "none";
    }
  };
  // Upload file nhạc
  document.querySelector("#uploadForm").onsubmit = function (e) {
    const songName = document.getElementById("songName").value;
    const singer = document.getElementById("singer").value;
    const songFile = document.getElementById("songFile").files[0];
    const songImage = document.getElementById("songImage").files[0];
    e.preventDefault();

    // Đọc file
    const readerAudio = new FileReader();
    const readerImage = new FileReader();
    readerAudio.onload = function (audioEvent) {
      const audioUrl = audioEvent.target.result; // Lấy URL

      readerImage.onload = function (imageEvent) {
        const imageUrl = imageEvent.target.result;

        songs.push({
          name: songName,
          singer: singer,
          path: audioUrl,
          image: imageUrl,
        });
        render();
        uploadForm.reset();
      };
      // Đọc file img
      readerImage.readAsDataURL(songImage);
    };
    readerAudio.readAsDataURL(songFile);
  };
}

function loadCurrentSong() {
  const currentSong = getCurrentSong();
  heading.textContent = currentSong.name;
  cdThumb.style.backgroundImage = `url('${currentSong.image}')`;
  audio.src = currentSong.path;
}

function nextSong() {
  playerState.currentIndex =
    playerState.currentIndex + 1 >= songs.length
      ? 0
      : playerState.currentIndex + 1;
}

function prevSong() {
  playerState.currentIndex =
    playerState.currentIndex - 1 < 0
      ? songs.length - 1
      : playerState.currentIndex - 1;
}
function updateProgressBarBackground(progressPercent) {
  const progressContainer = document.querySelector(".progress-container");
  progressContainer.style.background = `linear-gradient(to right, #ACA9BB ${progressPercent}%, #e0e0e0 ${progressPercent}%)`;
}
function start() {
  handleEvents();
  loadCurrentSong();
  render();
}

start();
