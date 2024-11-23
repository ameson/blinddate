<template>
  <div class="potential">
    <!-- 顶部进度 -->
    <van-sticky>
      <div class="progress-bar">
        <van-progress :percentage="80" color="#3498db" />
        <div class="step-text">发展潜力 4/5</div>
      </div>
    </van-sticky>

    <!-- 职业发展 -->
    <section class="section-block" ref="careerRef">
      <h3>职业发展</h3>
      <div class="career-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in careerOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.career === option.value }"
              @click="selectCareer(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 工作能力 -->
    <section class="section-block" ref="abilityRef">
      <h3>工作能力</h3>
      <div class="ability-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in abilityOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.ability === option.value }"
              @click="selectAbility(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 学习意愿 -->
    <section class="section-block" ref="learningRef">
      <h3>学习意愿</h3>
      <div class="learning-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in learningOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.learning === option.value }"
              @click="selectLearning(option.value)"
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
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Potential',
  setup() {
    const router = useRouter()
    const store = useStore()

    const careerRef = ref(null)
    const abilityRef = ref(null)
    const learningRef = ref(null)
    const nextButtonRef = ref(null)

    const userInfo = reactive({
      career: '',
      ability: '',
      learning: ''
    })

    const careerOptions = [
      { label: '稳定发展', value: 'stable', icon: 'chart-trending-o' },
      { label: '快速上升', value: 'fast', icon: 'arrow-up' },
      { label: '创业阶段', value: 'startup', icon: 'fire-o' },
      { label: '寻找方向', value: 'seeking', icon: 'guide-o' }
    ]

    const abilityOptions = [
      { label: '优秀', value: 'excellent', icon: 'star' },
      { label: '良好', value: 'good', icon: 'like-o' },
      { label: '一般', value: 'average', icon: 'smile-o' },
      { label: '需提升', value: 'improve', icon: 'ascending' }
    ]

    const learningOptions = [
      { label: '持续学习', value: 'continuous', icon: 'bookmark-o' },
      { label: '偶尔学习', value: 'occasional', icon: 'clock-o' },
      { label: '被动学习', value: 'passive', icon: 'warning-o' },
      { label: '无意愿', value: 'none', icon: 'close' }
    ]

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

    const selectCareer = async (value) => {
      userInfo.career = value
      await smoothScroll(abilityRef)
    }

    const selectAbility = async (value) => {
      userInfo.ability = value
      await smoothScroll(learningRef)
    }

    const selectLearning = async (value) => {
      userInfo.learning = value
      if (isValid.value) {
        await smoothScroll(nextButtonRef)
      }
    }

    const isValid = computed(() => {
      return userInfo.career && userInfo.ability && userInfo.learning
    })

    const nextStep = () => {
      if (isValid.value) {
        store.commit('updatePotential', userInfo)
        router.push('/attitude')
      }
    }

    return {
      careerRef,
      abilityRef,
      learningRef,
      nextButtonRef,
      userInfo,
      careerOptions,
      abilityOptions,
      learningOptions,
      selectCareer,
      selectAbility,
      selectLearning,
      isValid,
      nextStep
    }
  }
}
</script>

<style scoped>
.potential {
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
