<template>
  <div class="scratch-card">
    <canvas class="center" id="fg" width=300 height=180 ref="fg">
    </canvas>
    <canvas class="center" id="bg" width=300 height=180 ref="bg">
    </canvas>
  </div>
</template>

<script>
import fgSrc from '@/assets/scratch-card.jpg';
import bgSrc from '@/assets/bravo.png';

export default {
  name: 'ScratchCard',
  props: {
    mate: String,
  },
  data() {
    return {
      shortMate: '',
      scratching: false,
      canvas: null,
      ctx: null,
      imgd: null,
      buf: null,
      width: 0,
      height: 0,
      x: -1,
      y: -1,
    };
  },
  methods: {
    startScratching(e) {
      const rect = this.fg.getBoundingClientRect();
      this.x = e.clientX - rect.left;
      this.y = e.clientY - rect.top;
      this.scratching = true;
    },
    stopScratching() {
      this.scratching = false;
    },
    init() {
      const fgImg = new Image(300, 180);
      fgImg.src = fgSrc;
      fgImg.onload = () => {
        this.fgctx.beginPath();
        this.fgctx.rect(0, 0, this.width, this.height);
        this.fgctx.drawImage(fgImg, 0, 0, 300, 180);
        this.fgctx.closePath();
        this.imgd = this.fgctx.getImageData(0, 0, this.width, this.height);
        this.buf = this.imgd.data;
      };
      const bgImg = new Image(300, 180);
      bgImg.src = bgSrc;
      bgImg.onload = () => {
        this.bgctx.beginPath();
        this.bgctx.rect(0, 0, this.width, this.height);
        this.bgctx.drawImage(bgImg, 0, 0, 300, 180);
        this.bgctx.closePath();
        this.drawText();
      };
      document.addEventListener('mousedown', this.startScratching);
      document.addEventListener('touchstart', this.startScratching);
      document.addEventListener('mouseup', this.stopScratching);
      document.addEventListener('touchend', this.stopScratching);
      this.fg.addEventListener('mousemove', (e) => {
        if (this.scratching) {
          const rect = this.fg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          this.scratch(x, y);
        }
      });
      this.fg.addEventListener('touchmove', (e) => {
        if (this.scratching) {
          const mouseEvt = new MouseEvent('mousemove', {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY,
          });
          this.fg.dispatchEvent(mouseEvt);
        }
      });
    },
    drawText() {
      this.bgctx.fillStyle = '#222';
      this.bgctx.textAlign = 'center';
      this.bgctx.font = '30px monospace';
      this.bgctx.fillText(this.shortMate, this.width / 2, this.height / 2 + 5);
    },
    draw() {
      this.fgctx.beginPath();
      this.fgctx.clearRect(0, 0, this.width, this.height);
      this.fgctx.putImageData(this.imgd, 0, 0);
      this.fgctx.closePath();
    },
    distanceTo(ox, oy, dx, dy) {
      return (Math.sqrt((dx - ox) ** 2 + (dy - oy) ** 2));
    },
    clearCircle(x, y, r = 10) {
      for (let ix = x - r; ix < x + r; ix += 1) {
        if (ix >= 0 && ix < this.width) {
          for (let iy = y - r; iy < y + r; iy += 1) {
            if (iy >= 0 && iy < this.height && this.distanceTo(ix, iy, x, y) < r) {
              this.buf[(iy * this.width + ix) * 4 + 3] = 0;
            }
          }
        }
      }
    },
    scratch(x, y, r = 10) {
      if (this.x !== -1 && this.y !== -1) {
        /**
         * Fill the blanks between two mouse positions
         */
        let count = 0;
        const dist = this.distanceTo(this.x, this.y, x, y);
        const stepx = ((x - this.x) / dist) * r;
        const stepy = ((y - this.y) / dist) * r;
        while (count < 20 && this.x !== -1 && this.y !== -1
               && this.distanceTo(this.x, this.y, x, y) > r * 2) {
          this.x = Math.floor(this.x + stepx);
          this.y = Math.floor(this.y + stepy);
          this.clearCircle(this.x, this.y, r);
          count += 1;
        }
      }
      this.x = Math.floor(x);
      this.y = Math.floor(y);
      this.clearCircle(this.x, this.y, r);
      this.draw();
    },
  },
  beforeMount() {
    this.shortMate = this.mate.substr(0, this.mate.indexOf('@'));
    const firstname = this.shortMate.match('^([^-\\s]+)(-[\\S]+)*\\.');
    const lastname = this.shortMate.match('\\.([^-\\s]+)');
    this.shortMate = `${firstname[1]} ${lastname[1]}`;
  },
  mounted() {
    this.fg = this.$refs.fg;
    this.fgctx = this.fg.getContext('2d');
    this.bg = this.$refs.bg;
    this.bgctx = this.bg.getContext('2d');
    this.width = this.fg.width;
    this.height = this.fg.height;
    this.init();
  },
};
</script>

<style scoped>
  canvas#fg {
    z-index: 2;
    background: transparent;
  }

  canvas#bg {
    z-index: 1;
    background: #A8A8A8;
  }
</style>
