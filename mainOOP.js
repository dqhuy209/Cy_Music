function MusicPlayer() {
  this.player = document.querySelector(".player");
  this.cd = document.querySelector(".cd");
  this.heading = document.querySelector("header h2");
  this.cdThumb = document.querySelector(".cd-thumb");
  this.audio = document.querySelector("#audio");
  this.playBtn = document.querySelector(".btn-toggle-play");
  this.progress = document.querySelector("#progress");
  this.nextBtn = document.querySelector(".btn-next");
  this.prevBtn = document.querySelector(".btn-prev");
  this.playlist = document.querySelector(".playlist");
  this.fileUpload = document.querySelector("#file-upload");
  this.progressContainer = document.querySelector(".progress-container");
  this.uploadForm = document.querySelector("#uploadForm");

  this.songs = [
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

  this.playerState = new Proxy(
    {
      currentIndex: 0,
      isPlaying: false,
    },
    {
      set: (target, key, value) => {
        target[key] = value;

        if (key === "currentIndex") {
          this.loadCurrentSong();
          this.render();
        }

        if (key === "isPlaying") {
          if (value) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
          this.player.classList.toggle("playing", value);
        }

        return true;
      },
    }
  );

  this.render = function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.playerState.currentIndex ? "active" : ""
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
    this.playlist.innerHTML = htmls.join("");
  };

  this.getCurrentSong = function () {
    return this.songs[this.playerState.currentIndex];
  };

  this.handleEvents = function () {
    const _this = this;
    this.playBtn.onclick = function () {
      _this.playerState.isPlaying = !_this.playerState.isPlaying;
    };

    this.audio.ontimeupdate = function () {
      if (_this.audio.duration) {
        const progressPercent = Math.floor(
          (_this.audio.currentTime / _this.audio.duration) * 100
        );
        _this.updateProgressBarBackground(progressPercent);
        _this.progress.style.width = `${progressPercent}%`;
      }
    };

    let isDragging = false;
    this.progressContainer.onmousedown = function (e) {
      isDragging = true;
      _this.updateProgress(e);
    };

    this.progressContainer.onmousemove = function (e) {
      if (isDragging) {
        _this.updateProgress(e);
      }
    };

    this.progressContainer.onmouseup = function () {
      isDragging = false;
    };

    this.progressContainer.onmouseleave = function () {
      isDragging = false;
    };

    this.nextBtn.onclick = function () {
      _this.nextSong();
    };

    this.prevBtn.onclick = function () {
      _this.prevSong();
    };

    this.playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode) {
        _this.playerState.currentIndex = Number(songNode.dataset.index);
        _this.playerState.isPlaying = true;
        _this.audio.play();
      }
    };

    const toggleBtn = document.querySelector("#toggleUploadForm");
    toggleBtn.onclick = function () {
      if (_this.uploadForm.style.display === "none") {
        _this.uploadForm.style.display = "block";
      } else {
        _this.uploadForm.style.display = "none";
      }
    };

    document.querySelector("#uploadForm").onsubmit = function (e) {
      const songName = document.getElementById("songName").value;
      const singer = document.getElementById("singer").value;
      const songFile = document.getElementById("songFile").files[0];
      const songImage = document.getElementById("songImage").files[0];
      e.preventDefault();

      const readerAudio = new FileReader();
      const readerImage = new FileReader();
      readerAudio.onload = function (audioEvent) {
        const audioUrl = audioEvent.target.result;

        readerImage.onload = function (imageEvent) {
          const imageUrl = imageEvent.target.result;

          _this.songs.push({
            name: songName,
            singer: singer,
            path: audioUrl,
            image: imageUrl,
          });
          _this.render();
          _this.uploadForm.reset();
        };
        readerImage.readAsDataURL(songImage);
      };
      readerAudio.readAsDataURL(songFile);
    };
  };

  this.loadCurrentSong = function () {
    const currentSong = this.getCurrentSong();
    this.heading.textContent = currentSong.name;
    this.cdThumb.style.backgroundImage = `url('${currentSong.image}')`;
    this.audio.src = currentSong.path;
  };

  this.nextSong = function () {
    this.playerState.currentIndex =
      this.playerState.currentIndex + 1 >= this.songs.length
        ? 0
        : this.playerState.currentIndex + 1;
  };

  this.prevSong = function () {
    this.playerState.currentIndex =
      this.playerState.currentIndex - 1 < 0
        ? this.songs.length - 1
        : this.playerState.currentIndex - 1;
  };

  this.updateProgress = function (e) {
    const containerWidth = this.progressContainer.offsetWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / containerWidth) * this.audio.duration;
    this.audio.currentTime = newTime;

    const progressPercent = Math.floor((newTime / this.audio.duration) * 100);
    this.updateProgressBarBackground(progressPercent);
    this.progress.style.width = `${progressPercent}%`;
  };

  this.updateProgressBarBackground = function (progressPercent) {
    this.progressContainer.style.background = `linear-gradient(to right, #ACA9BB ${progressPercent}%, #e0e0e0 ${progressPercent}%)`;
  };

  this.start = function () {
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  };
}

const musicPlayer = new MusicPlayer();
musicPlayer.start();
