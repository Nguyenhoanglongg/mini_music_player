/**
 * 1. Render songs
 * 2. Scroll top
 *·3. Play / pause / seek
 *4. CD rotate
 * 5. Next / prev
 * 6. Random
 *7. ·Next / Repeat when ended
 *8. Active song
 * 9. Scroll active song into view
 *10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "MY_PLAYER";

const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const playlist = $(".playlist");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const volumeHigh = $(".btn-volume__high");
const volumeMute = $(".btn-volume__mute");
const volumeProgress = $(".volume-progress");
const volumeBlock = $(".volume-block");
const timeStart = $(".progress-start-time");
const timeEnd = $(".progress-start-end");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isDragging: true,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  song: [
    {
      name: "Không Cần",
      singer: "The SHEEP",
      path: "./assets/music/Khong-Can-Cover-The-Sheep.mp3",
      image: "./assets/img/Khong_can_SHEEP.jpg",
    },
    {
      name: "Crying Over You",
      singer: "JustaTee ft Binz",
      path: "./assets/music/Crying-Over-You-JustaTee-Binz.mp3",
      image: "./assets/img/crying_over_you.jpg",
    },
    {
      name: "Lời nói dối chân thật",
      singer: "JustaTee ft Kimmese",
      path: "./assets/music/Loi-Noi-Doi-Chan-That-JustaTee-Kimmese.mp3",
      image: "./assets/img/loinoidoichanthat.jpg",
    },
    {
      name: "Phía sau em",
      singer: "Kay Trần ft Binz",
      path: "./assets/music/Phia-Sau-Em-Kay-Tran-Binz.mp3",
      image: "./assets/img/phiasauem.jpg",
    },
    {
      name: "Real love",
      singer: "JustaTee ft Kimmese",
      path: "./assets/music/Real-Love-JustaTee-Kimmese.mp3",
      image: "./assets/img/real_love.jpg",
    },
    {
      name: "Tay to",
      singer: "MCK, PhongKhin",
      path: "./assets/music/Tay-To-Rapital-RPT-Phongkhin-MCK.mp3",
      image: "./assets/img/tayto.jpg",
    },
    {
      name: "Vô tình",
      singer: "Xesi, Hoaprox",
      path: "./assets/music/Vo-Tinh-Xesi-Hoaprox.mp3",
      image: "./assets/img/votinh.jpg",
    },
    {
      name: "Để tôi ôm em bằng giai điệu này",
      singer: "KAI ĐINH x MIN x GREY D",
      path: "./assets/music/để tôi ôm em bằng giai điệu này - KAI ĐINH x MIN x GREY D.mp3",
      image: "./assets/img/detoiomembanggiaidieunay.jpg",
    },
    {
      name: "Sau Tất Cả",
      singer: "ERIK",
      path: "./assets/music/Sau Tất Cả-ERIK.mp3",
      image: "./assets/img/sautatca.jpg",
    },
    {
      name: "Mùa Đông",
      singer: "ERIK",
      path: "./assets/music/Mùa Đông-ERIK.mp3",
      image: "./assets/img/muadong.jpg",
    },
    {
      name: "Nếu Ngày Ấy",
      singer: "SOOBIN",
      path: "./assets/music/Nếu Ngày Ấy - SOOBIN.mp3",
      image: "./assets/img/neungayay.jpg",
    },

    {
      name: "2AM",
      singer: "JustaTee x Big Daddy",
      path: "./assets/music/2AM-JustaTee-BigDaddy.mp3",
      image: "./assets/img/2am.jpg",
    },
    {
      name: "QUERRY",
      singer: "QNT - Trung Tran - MCK",
      path: "./assets/music/Querry-QNT-Trung-Tran-MCK.mp3",
      image: "./assets/img/querry.jpg",
    },
    {
      name: "Thích quá rùi nà",
      singer: "tlinh - Trung Tran - MCK - Wxrdie - PhongKhin",
      path: "./assets/music/Thich-Qua-Rui-Na-tlinh-Trung-Tran-Wxrdie-MCK-Phongkhin.mp3",
      image: "./assets/img/thichquaruina.jpg",
    },
    {
      name: "XTC",
      singer: "Groovie - MCK - Tlinh",
      path: "./assets/music/XTC-Xich-Them-Chut-Remix-Rapital-Groovie-tlinh-MCK.mp3",
      image: "./assets/img/xtc.jpg",
    },
    {
      name: "Những ngày vắng em",
      singer: "Thái Đinh",
      path: "./assets/music/Nhung-Ngay-Vang-Em-Thai-Dinh.mp3",
      image: "./assets/img/thaidinh.jpg",
    },
    {
      name: "Đi qua mùa hạ",
      singer: "Thái Đinh",
      path: "./assets/music/diquamuaha.mp3",
      image: "./assets/img/thaidinh.jpg",
    },
    {
      name: "Và thế giới đã mất đi một người cô đơn",
      singer: "Groovie - MCK - Tlinh",
      path: "./assets/music/VA-THE-GIOI-DA-MAT-DI-MOT-NGUOI-CO-DON-marzuz-Gill-Onionn.mp3",
      image: "./assets/img/vathegioidamatdi.jpg",
    },
    {
      name: "NO INTERNET",
      singer: "7UPPERCUT x Seachains",
      path: "./assets/music/nointernet.mp3",
      image: "./assets/img/nointernet.jpg",
    },
  ],
  render: function () {
    const htmls = this.song.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
             </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>
    `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.song[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    let currentVolume = 1;

    //Xu ly CD xoay/ dung
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, //10s
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    //Xử lý phóng to/ thu nhỏ CD
    document.onscroll = function () {
      const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.onscroll;
      const newCdWidth = cdWidth - scrollTop;
      // Thay doi kich thuoc cd
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;

      //Thay doi kich thuoc volume

      volumeBlock.style.height = newCdWidth > 0 ? 36 + "px" : 0 + "px";

      volumeBlock.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý click play
    playBtn.onclick = function togglePlay() {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // Press spacebar to pause/play song
    function onKeyDown(event) {
      switch (event.keyCode) {
        case 32: //SpaceBar
          if (_this.isPlaying) {
            audio.pause();
          } else {
            audio.play();
          }
          break;
      }
      return false;
    }

    window.addEventListener("keydown", onKeyDown, false);
    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    // Khi song bi pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    // Trạng thái của isDraggingProgress khi nhấn chuột xuống
    progress.onmousedown = function () {
      _this.isDraggingProgress = false;
    };

    // Trạng thái của isDraggingProgress khi nhấn chuột lên
    progress.onmouseup = function () {
      _this.isDraggingProgress = true;
    };
    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progessPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progessPercent;

        _this.startTimer(audio.currentTime);
        _this.endTimer();
        // Lấy current progress && current index
        _this.setConfig("lastProgress", audio.currentTime);
        _this.setConfig("lastIndex", _this.currentIndex);
        _this.setConfig("lastVolume", audio.volume);
      }
    };
    // Xu ly khi tua bai hat
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      _this.startTimer(seekTime);
    };

    //Khi next bai hat
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // Bind [ALT + 3] to next song
    document.addEventListener("keydown", function (event) {
      if (event.altKey && event.keyCode === 51) {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.nextSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      }
    });

    //Prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //Bind [ALT + 4] to Prev Song
    document.addEventListener("keydown", function (event) {
      if (event.altKey && event.keyCode === 52) {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.prevSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      }
    });

    //xu ly random bai hat bat /tat random
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // Xu ly phat lai 1 bai hat
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);

      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // Xu ly next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Lắng nghe hành vi click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
          // console.log(songNode.dataset.index);
        }

        // Xử lý khi click vào option
        if (e.target.closest(".option")) {
        }
      }
    };

    // Icon volume active
    volumeHigh.onclick = function Mute() {
      volumeHigh.style.display = "none";
      volumeMute.style.display = "block";
      audio.volume = 0;
      volumeProgress.value = 0;
    };

    // Icon volume off
    volumeMute.onclick = function UnMute() {
      volumeHigh.style.display = "block";
      volumeMute.style.display = "none";

      if (currentVolume === 0) {
        currentVolume = 1;
      }
      audio.volume = currentVolume;
      volumeProgress.value = currentVolume * 100;
    };
    var isMuted = false;

    function toggleMute() {
      if (isMuted) {
        audio.muted = false;
        isMuted = false;
        volumeHigh.style.display = "block";
        volumeMute.style.display = "none";
      } else {
        audio.muted = true;
        isMuted = true;
        volumeHigh.style.display = "none";
        volumeMute.style.display = "block";
      }
    }

    document.onkeydown = function (e) {
      if (e.keyCode == 77) {
        toggleMute();
      }
      // function checkMute() {
      //   alert(audio.muted);
      // }
      // console.log(checkMute());
    };
    // Khi click vao thanh volume, thong so volume se thay doi theo
    volumeProgress.onclick = function () {
      audio.volume = volumeProgress.value / 100;
      currentVolume = audio.volume;
    };
    // Khi tua volume pc
    volumeProgress.onmousemove = function () {
      audio.volume = volumeProgress.value / 100;
      currentVolume = audio.volume;
      if (audio.volume === 0) {
        volumeHigh.style.display = "none";
        volumeMute.style.display = "block";
      } else {
        volumeHigh.style.display = "block";
        volumeMute.style.display = "none";
      }
    };

    // Khi tua volume điện thoại
    volumeProgress.ontouchmove = function () {
      audio.volume = volumeProgress.value / 100;
      // console.log(volumeProgress.value);
      currentVolume = audio.volume;
      if (audio.volume === 0) {
        volumeHigh.style.display = "none";
        volumeMute.style.display = "block";
      } else {
        volumeHigh.style.display = "block";
        volumeMute.style.display = "none";
      }
    };
  },

  scrollToActiveSong: function () {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  },
  loadConfig: function () {
    audio.volume =
      typeof this.config.lastVolume === "undefined"
        ? 1
        : this.config.lastVolume;

    volumeProgress.value = audio.volume * 100;
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;

    console.log(heading, cdThumb, audio);
  },
  //Next
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.song.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  //Prev
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.song.length - 1;
    }
    this.loadCurrentSong();
  },
  //Random
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.song.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  // Bắt đầu chạy time
  startTimer: function (e) {
    let startMinute = Math.floor(e / 60);
    let startSecond = Math.floor(e % 60);

    let displayStartMinute = startMinute < 10 ? "0" + startMinute : startMinute;
    let displayStartSecond = startSecond < 10 ? "0" + startSecond : startSecond;

    timeStart.textContent = displayStartMinute + " : " + displayStartSecond;
  },

  // Time end

  endTimer: function () {
    let endMinute = Math.floor(audio.duration / 60);
    let endSecond = Math.floor(audio.duration % 60);

    let displayEndMinute = endMinute < 10 ? "0" + endMinute : endMinute;
    let displayEndSecond = endSecond < 10 ? "0" + endSecond : endSecond;

    timeEnd.textContent = displayEndMinute + " : " + displayEndSecond;
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();
    //Định nghĩa các thuộc tính cho Obj
    this.defineProperties();

    //Lắng nghe/ xử lý các sự kiện(DOM events)
    this.handleEvents();

    //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    //Render Playlist
    this.render();

    // Hiển thị trang thái ban đầu của repeat/Random
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};
app.start();
