<template>
  <div class="attitude">
    <!-- 顶部进度 -->
    <van-sticky>
      <div class="progress-bar">
        <van-progress :percentage="100" color="#3498db" />
        <div class="step-text">婚恋态度 5/5</div>
      </div>
    </van-sticky>

    <!-- 婚姻观念 -->
    <section class="section-block" ref="marriageRef">
      <h3>婚姻观念</h3>
      <div class="marriage-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in marriageOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.marriage === option.value }"
              @click="selectMarriage(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 择偶标准 -->
    <section class="section-block">
      <h3>择偶标准</h3>
      <div class="standard-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in standardOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.standard === option.value }"
              @click="selectStandard(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 恋爱经历 -->
    <section class="section-block" ref="experienceRef">
      <h3>恋爱经历</h3>
      <div class="experience-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in experienceOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.experience === option.value }"
              @click="selectExperience(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 导航按钮 -->
    <div class="nav-buttons" ref="nextButtonRef">
      <van-button round block type="primary" @click="nextStep" :disabled="!isValid">
        查看结果
      </van-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Attitude',
  setup() {
    const router = useRouter()
    const store = useStore()

    // 创建ref引用
    const marriageRef = ref(null)
    const experienceRef = ref(null)
    const nextButtonRef = ref(null)

    const userInfo = reactive({
      marriage: '',
      standard: '',
      experience: ''
    })

    // 滚动函数
    const smoothScroll = async (targetRef) => {
      await nextTick()
      const element = targetRef.value
      if (element) {
        const offset = element.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        })
      }
    }

    const selectMarriage = async (value) => {
      userInfo.marriage = value
      await smoothScroll(experienceRef)
    }

    const selectStandard = (value) => {
      userInfo.standard = value
    }

    const selectExperience = async (value) => {
      userInfo.experience = value
      if (isValid.value) {
        await smoothScroll(nextButtonRef)
      }
    }

    const isValid = computed(() => {
      return userInfo.marriage && userInfo.standard && userInfo.experience
    })

    const nextStep = () => {
      if (isValid.value) {
        store.commit('updateAttitude', userInfo)
        router.push('/result')
      }
    }

    return {
      marriageRef,
      experienceRef,
      nextButtonRef,
      userInfo,
      marriageOptions: [
        { label: '憧憬婚姻', value: 'positive', icon: 'like' },
        { label: '顺其自然', value: 'neutral', icon: 'smile-o' },
        { label: '谨慎考虑', value: 'cautious', icon: 'eye-o' },
        { label: '暂不考虑', value: 'negative', icon: 'close' }
      ],
      standardOptions: [
        { label: '外在条件', value: 'appearance', icon: 'photo-o' },
        { label: '性格品质', value: 'personality', icon: 'smile-o' },
        { label: '经济基础', value: 'economic', icon: 'gold-coin-o' },
        { label: '门当户对', value: 'matching', icon: 'balance-o' }
      ],
      experienceOptions: [
        { label: '0段经历', value: 'none', icon: 'close' },
        { label: '1-2段', value: 'few', icon: 'smile-o' },
        { label: '3-4段', value: 'some', icon: 'friends-o' },
        { label: '5段以上', value: 'many', icon: 'more-o' }
      ],
      selectMarriage,
      selectStandard,
      selectExperience,
      isValid,
      nextStep
    }
  }
}
</script>

<style scoped>
.attitude {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.progress-bar {
  background: white;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.step-text {
  text-align: center;
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}

.section-block {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  scroll-margin-top: 80px;
}

.section-block h3 {
  margin: 0 0 15px;
  color: #2c3e50;
  font-size: 18px;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.option-card.active {
  border-color: #3498db;
  background: #ebf5fb;
}

.option-card span {
  margin-top: 8px;
  font-size: 14px;
  color: #2c3e50;
}

.nav-buttons {
  padding: 20px;
  position: sticky;
  bottom: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}
</style>
