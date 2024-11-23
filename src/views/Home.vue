<template>
  <div class="home comic-style">
    <div class="content-wrapper">
      <img src="../assets/comic-style-image.svg" alt="Comic Style" class="comic-image" />
      <h1 class="title">相亲指数男生版</h1>
      <van-button 
        type="primary" 
        class="start-button"
        color="#3498db"
        round
        size="large"
        @click="startAssessment"
      >
        开始测试
      </van-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()

    const startAssessment = () => {
      router.push('/basic-info')
    }

    return {
      startAssessment
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.content-wrapper {
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(44, 62, 80, 0.1);
  text-align: center;
}

.comic-image {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 2rem;
  display: block;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-weight: 600;
}

.start-button {
  width: 200px;
  height: 50px;
  font-size: 1.2rem;
  border: none;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
}

.start-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 6px rgba(52, 152, 219, 0.3);
}
</style>
