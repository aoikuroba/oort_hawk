<template>
  <div class="root">
    <div class="wrapper">
      <h1 style="visibility: hidden;">placeholder</h1>
      <h2 style="visibility: hidden;">placeholder</h2>

      <div class="inputBox">
        <input type="text" required="required" v-model="loginInfo.userName">
        <span>用户名</span>
        <i></i>
      </div>
      <div class="inputBox">
        <input type="password" required="required" v-model="loginInfo.userPassword">
        <span>密码</span>
        <i></i>
      </div>
      <div class="function-box">
        <div>
          <input id="checkbox" type="checkbox" v-model="autoLogin">
          <label for="checkbox">自动登录</label>
        </div>
        <div><a href="#">注册</a></div>
      </div>
      <div class="circle" @click="handleLogin"> </div>
      <div class="title">系统登陆</div>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/user.js'
export default {
  data() {
    return {
      autoLogin: "false",
      loginInfo: {
        userName: "",
        userPassword: "",
      }
    }
  },
  methods: {
    // root+1234
    handleLogin() {
      userApi.login(this.loginInfo)
        // userApi.login({userName:this.loginInfo.userName,userPassword:this.loginInfo.userPassword})
        .then((res) => {
          this.$router.push('/datadisplay')
        })
        .catch((err) => {
          this.$Message.info(err.msg || err);
        })

      // this.$router.push('/datadisplay')


      // if (valid) {
      //   userAPI.login({ userName: username, userPassword: password })
      //     .then((data) => {
      //       this.$router.push('/datadisplay')
      //     })
      //     .catch((err) => {
      //       this.$Message.info(err.msg || err);
      //       // ElMessage(err.msg || err)
      //     })
      // } else {
      //   this.$Message.info('请输入格式正确的用户名和密码');
      // }
    }
  },
  watch: {
    autoLogin: {
      handler(newVal) {
        localStorage.setItem("autoLogin", "" + newVal);
      },
    }
  },
  mounted() {
    let tmp = localStorage.getItem("autoLogin");
    if (!tmp) { localStorage.setItem("autoLogin", "false"); tmp = "false" }
    this.autoLogin = eval(tmp.toLowerCase());
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}

.title {
  letter-spacing: 1rem;
  color: transparent;
  position: relative;
  bottom: 28rem;
  font-size: xx-large;

  color: #E4E1DB;

  background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
  animation: animates 2s linear infinite;
  transition: 0.4s;

  @keyframes animates {
    0% {
      background-position-x: 0;
    }

    100% {
      background-position-x: 192px;
    }
  }

  -webkit-background-clip: text;
}

.circle {
  position: relative;
  top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #fff;

  &::after {
    content: "";
    position: absolute;
    width: 39px;
    height: 39px;
    border-radius: 50%;
    background: #222;
    backdrop-filter: blur(15px);
  }

}

.circle:hover {
  cursor: pointer;
  background-image: linear-gradient(0deg,
      #ff1b69, #ff0 25%, #2196f3 50%, #9c27b0 75%, #ff1b69 100%);
  animation: rotate 1s linear infinite;

  &::before {
    content: "";
    position: absolute;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-image: linear-gradient(0deg,
        #ff1b69, #ff0 25%, #2196f3 50%, #9c27b0 75%, #ff1b69 100%);
    filter: blur(20px);
  }

  &~.title {
    // color: transparent;
    text-shadow: 0 0 5px #2196f3, 0 0 15px #ff1b69, 0 0 10px #ff0, 0 0 20px #9c27b0;
    // text-shadow: 0 0 20px purple;
  }
}

span {
  position: absolute;
  color: #fff;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.root {
  background-color: #222;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/engine.jpg");
  background-size: cover;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30vh;
  flex-direction: column;
  gap: 50px;

  margin: auto;
  width: 400px;

  border-radius: 12px;

  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px #fff;
}


.inputBox {
  position: relative;
  width: 250px;
}

.inputBox input {
  width: 100%;
  background: transparent;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 1em;
  letter-spacing: 0.1em;
  padding: 10px 0 5px;
}

.inputBox span {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 6px 0 5px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  pointer-events: none;
  letter-spacing: 0.1em;
  transition: 0.5s;
  // font-size: 1.5rem;

}

.inputBox input:hover~span,
.inputBox input:hover~span,
.inputBox input:valid~span,
.inputBox input:focus~span {
  color: #2196f3;
  transform: translateY(-16px);
  font-size: 0.65em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  overflow: hidden;
}

.inputBox i::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
  animation: animate 2s linear infinite;
  transition: 0.5s;
}

.inputBox input:valid~i::before,
.inputBox input:focus~i::before {
  left: 0;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: 250px;
  }
}

.function-box {
  color: #E4E1DB;
  display: flex;
  justify-content: space-between;
  width: 250px;
}

.function-box input {
  position: relative;
  top: 2px;
  margin-right: 2px;
  cursor: pointer;
}

.function-box label {
  color: rgba(255, 255, 255, 0.5);

  position: relative;
  vertical-align: top;
  transition: color 0.3s;
  cursor: pointer;
  font-weight: normal;
}

.function-box a {
  color: rgba(255, 255, 255, 0.5);
}

.function-box a:hover {
  color: rgba(255, 255, 255, 0.7);
}

.function-box a:active {
  color: rgba(255, 255, 255, 0.9);
}
</style>
