<template>
  <div class="economic">
    <!-- 顶部进度 -->
    <van-sticky>
      <div class="progress-bar">
        <van-progress :percentage="40" color="#3498db" />
        <div class="step-text">经济状况 2/5</div>
      </div>
    </van-sticky>

    <!-- 年收入 -->
    <section class="section-block" ref="incomeRef">
      <h3>年收入（税前）</h3>
      <div class="income-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="income in incomeOptions" :key="income.value">
            <div
              class="income-card"
              :class="{ active: userInfo.income === income.value }"
              @click="selectIncome(income.value)"
            >
              <van-icon :name="income.icon" size="24" />
              <span>{{ income.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 房产情况 -->
    <section class="section-block" ref="houseRef">
      <h3>房产情况</h3>
      <div class="house-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="house in houseOptions" :key="house.value">
            <div
              class="house-card"
              :class="{ active: userInfo.house === house.value }"
              @click="selectHouse(house.value)"
            >
              <van-icon :name="house.icon" size="24" />
              <span>{{ house.label }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </section>

    <!-- 车辆情况 -->
    <section class="section-block" ref="carRef">
      <h3>车辆情况</h3>
      <div class="car-cards">
        <van-grid :column-num="2" :gutter="10">
          <van-grid-item v-for="car in carOptions" :key="car.value">
            <div
              class="car-card"
              :class="{ active: userInfo.car === car.value }"
              @click="selectCar(car.value)"
            >
              <van-icon :name="car.icon" size="24" />
              <span>{{ car.label }}</span>
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
  name: 'Economic',
  setup() {
    const router = useRouter()
    const store = useStore()

    const incomeRef = ref(null)
    const houseRef = ref(null)
    const carRef = ref(null)
    const nextButtonRef = ref(null)

    const userInfo = reactive({
      income: '',
      house: '',
      car: ''
    })

    const incomeOptions = [
      { label: '10万以下', value: 'below_100k', icon: 'balance-o' },
      { label: '10-20万', value: '100k_200k', icon: 'balance-list-o' },
      { label: '20-50万', value: '200k_500k', icon: 'gold-coin-o' },
      { label: '50万以上', value: 'above_500k', icon: 'diamond-o' }
    ]

    const houseOptions = [
      { label: '无房产', value: 'none', icon: 'home-o' },
      { label: '有贷款房', value: 'mortgage', icon: 'bill-o' },
      { label: '全款房', value: 'full', icon: 'certificate' },
      { label: '多套房产', value: 'multiple', icon: 'cluster-o' }
    ]

    const carOptions = [
      { label: '无车', value: 'none', icon: 'cross' },
      { label: '经济型', value: 'economic', icon: 'cart-o' },
      { label: '中高档', value: 'luxury', icon: 'cart-circle-o' },
      { label: '豪华车', value: 'super_luxury', icon: 'gem-o' }
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

    const selectIncome = async (value) => {
      userInfo.income = value
      await smoothScroll(houseRef)
    }

    const selectHouse = async (value) => {
      userInfo.house = value
      await smoothScroll(carRef)
    }

    const selectCar = async (value) => {
      userInfo.car = value
      if (isValid.value) {
        await smoothScroll(nextButtonRef)
      }
    }

    const isValid = computed(() => {
      return userInfo.income && userInfo.house && userInfo.car
    })

    const nextStep = () => {
      if (isValid.value) {
        store.commit('updateEconomic', userInfo)
        router.push('/family')
      }
    }

    return {
      incomeRef,
      houseRef,
      carRef,
      nextButtonRef,
      userInfo,
      incomeOptions,
      houseOptions,
      carOptions,
      selectIncome,
      selectHouse,
      selectCar,
      isValid,
      nextStep
    }
  }
}
</script>

<style scoped>
.economic {
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

.income-card,
.house-card,
.car-card {
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

.income-card.active,
.house-card.active,
.car-card.active {
  border-color: #3498db;
  background: #ebf5fb;
}

.income-card span,
.house-card span,
.car-card span {
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
