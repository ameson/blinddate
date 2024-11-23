<template>
  <div class="family">
    <!-- 顶部进度 -->
    <van-sticky>
      <div class="progress-bar">
        <van-progress :percentage="60" color="#3498db" />
        <div class="step-text">家庭背景 3/5</div>
      </div>
    </van-sticky>

    <!-- 父母情况 -->
    <section class="section-block" ref="parentsRef">
      <h3>父母情况</h3>
      <div class="parents-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in parentsOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.parents === option.value }"
              @click="selectParents(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 兄弟姐妹 -->
    <section class="section-block" ref="siblingsRef">
      <h3>兄弟姐妹</h3>
      <div class="siblings-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in siblingsOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.siblings === option.value }"
              @click="selectSiblings(option.value)"
            >
              <van-icon :name="option.icon" size="24" />
              <span>{{ option.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 家庭负担 -->
    <section class="section-block" ref="burdenRef">
      <h3>家庭负担</h3>
      <div class="burden-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="option in burdenOptions" :key="option.value">
            <div
              class="option-card"
              :class="{ active: userInfo.burden === option.value }"
              @click="selectBurden(option.value)"
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
  name: 'Family',
  setup() {
    const router = useRouter()
    const store = useStore()

    // 创建ref引用
    const parentsRef = ref(null)
    const siblingsRef = ref(null)
    const burdenRef = ref(null)
    const nextButtonRef = ref(null)

    const userInfo = reactive({
      parents: '',
      siblings: '',
      burden: ''
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

    const selectParents = async (value) => {
      userInfo.parents = value
      await smoothScroll(siblingsRef)
    }

    const selectSiblings = async (value) => {
      userInfo.siblings = value
      await smoothScroll(burdenRef)
    }

    const selectBurden = async (value) => {
      userInfo.burden = value
      if (isValid.value) {
        await smoothScroll(nextButtonRef)
      }
    }

    const isValid = computed(() => {
      return userInfo.parents && userInfo.siblings && userInfo.burden
    })

    const nextStep = () => {
      if (isValid.value) {
        store.commit('updateFamily', userInfo)
        router.push('/potential')
      }
    }

    return {
      parentsRef,
      siblingsRef,
      burdenRef,
      nextButtonRef,
      userInfo,
      parentsOptions: [
        { label: '父母健在', value: 'both', icon: 'friends-o' },
        { label: '单亲家庭', value: 'single', icon: 'user-o' },
        { label: '父母离异', value: 'divorced', icon: 'close' },
        { label: '其他情况', value: 'other', icon: 'more-o' }
      ],
      siblingsOptions: [
        { label: '独生子女', value: 'only', icon: 'user-o' },
        { label: '1个兄弟姐妹', value: 'one', icon: 'friends-o' },
        { label: '2个兄弟姐妹', value: 'two', icon: 'cluster-o' },
        { label: '3个及以上', value: 'more', icon: 'more-o' }
      ],
      burdenOptions: [
        { label: '无负担', value: 'none', icon: 'smile-o' },
        { label: '轻度负担', value: 'light', icon: 'balance-o' },
        { label: '中度负担', value: 'medium', icon: 'warning-o' },
        { label: '重度负担', value: 'heavy', icon: 'stop-circle-o' }
      ],
      selectParents,
      selectSiblings,
      selectBurden,
      isValid,
      nextStep
    }
  }
}
</script>

<style scoped>
.family {
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
