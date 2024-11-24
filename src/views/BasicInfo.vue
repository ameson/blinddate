<template>
  <div class="basic-info">
    <!-- 顶部进度 -->
    <van-sticky>
      <div class="progress-bar">
        <van-progress :percentage="20" color="#3498db" />
        <div class="step-text">基本信息 1/5</div>
      </div>
    </van-sticky>

    <!-- 年龄选择 -->
    <section class="section-block" ref="ageGroupRef">
      <h3>你的年龄段</h3>
      <div class="age-group">
        <div
          v-for="age in ageOptions"
          :key="age.value"
          class="age-card"
          :class="{ 
            active: userInfo.ageGroup === age.value,
            'hover-effect': userInfo.ageGroup !== age.value 
          }"
          @click="handleAgeGroupSelect(age.value)"
        >
          <span class="age-label">{{ age.label }}</span>
          <small class="age-desc">{{ age.desc }}</small>
        </div>
      </div>
    </section>
    <!-- 体重和健康 -->
<section class="section-block" ref="healthRef">
  <h3>体重和健康</h3>
  <div class="health-section">
    <!-- 身高体重输入 -->
    <div class="body-metrics">
      <div class="metric-input">
        <span class="metric-label">身高 (cm)</span>
        <van-stepper
          v-model="userInfo.height"
          :min="140"
          :max="220"
          :step="1"
          input-width="60px"
          button-size="22px"
        />
      </div>
      <div class="metric-input">
        <span class="metric-label">体重 (kg)</span>
        <van-stepper
          v-model="userInfo.weight"
          :min="35"
          :max="150"
          :step="0.5"
          input-width="60px"
          button-size="22px"
        />
      </div>
    </div>

    <!-- BMI 指数展示 -->
    <div class="bmi-display" v-if="bmiValue">
      <div class="bmi-value" :class="bmiStatus.class">
        BMI: {{ bmiValue.toFixed(1) }}
        <span class="bmi-label">{{ bmiStatus.label }}</span>
      </div>
      <div class="bmi-description">{{ bmiStatus.description }}</div>
    </div>

    <!-- 运动频率 -->
    <div class="exercise-section">
      <h4>运动频率</h4>
      <div class="exercise-options">
        <div
          v-for="exercise in exerciseOptions"
          :key="exercise.value"
          class="exercise-card"
          :class="{ 
            active: userInfo.exerciseFrequency === exercise.value,
            'hover-effect': userInfo.exerciseFrequency !== exercise.value 
          }"
          @click="handleExerciseSelect(exercise.value)"
        >
          <van-icon :name="exercise.icon" class="card-icon" size="24" />
          <div class="card-content">
            <span class="option-label">{{ exercise.label }}</span>
            <small class="option-desc">{{ exercise.desc }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- 学历选择 -->
    <section class="section-block" ref="educationRef">
      <h3>你的学历</h3>
      <div class="education-cards">
        <div
          v-for="edu in educationOptions"
          :key="edu.value"
          class="edu-card"
          :class="{ active: userInfo.education === edu.value }"
          @click="handleEducationSelect(edu.value)"
        >
          <van-icon :name="edu.icon" size="24" />
          <span>{{ edu.label }}</span>
        </div>
      </div>
    </section>

    <!-- 职业选择 -->
    <section class="section-block" ref="occupationRef">
      <h3>你的职业</h3>
      <div class="job-cards">
        <div
          v-for="job in jobOptions"
          :key="job.value"
          class="job-card"
          :class="{ active: userInfo.occupation === job.value }"
          @click="handleOccupationSelect(job.value)"
        >
          <van-icon :name="job.icon" size="24" />
          <span>{{ job.label }}</span>
        </div>
      </div>
    </section>

    <!-- 生活地点 -->
    <section class="section-block" ref="locationRef">
      <h3>生活地点</h3>
      <div class="location-description">
        <p>请选择您的生活地点类型：</p>
      </div>
      <div class="location-sections">
        <!-- 城市等级选择 -->
        <div class="location-section">
          <div class="selection-title">城市等级</div>
          <div class="city-tier">
            <div
              v-for="city in cityTierOptions"
              :key="city.value"
              class="city-card"
              :class="{ 
                active: userInfo.cityTier === city.value,
                'hover-effect': userInfo.cityTier !== city.value 
              }"
              @click="handleCityTierSelect(city.value)"
            >
              <van-icon :name="city.icon" class="card-icon" size="24" />
              <div class="card-content">
                <span class="option-label">{{ city.label }}</span>
                <small class="option-desc">{{ city.desc }}</small>
              </div>
            </div>
          </div>
        </div>

        <!-- 区域位置选择 -->
        <div class="location-section">
          <div class="selection-title">区域位置</div>
          <div class="area-location">
            <div
              v-for="area in areaOptions"
              :key="area.value"
              class="area-card"
              :class="{ 
                active: userInfo.areaLocation === area.value,
                'hover-effect': userInfo.areaLocation !== area.value 
              }"
              @click="handleAreaLocationSelect(area.value)"
            >
              <van-icon :name="area.icon" class="card-icon" size="24" />
              <div class="card-content">
                <span class="option-label">{{ area.label }}</span>
                <small class="option-desc">{{ area.desc }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="selection-status" v-if="!userInfo.cityTier || !userInfo.areaLocation">
        <van-icon name="info-o" />
        <span>请完成城市等级和区域位置的选择</span>
      </div>
    </section>

    <!-- 底部按钮 -->
    <div class="bottom-button" ref="nextButtonRef">
      <van-button 
        type="primary" 
        block 
        color="#3498db"
        :disabled="!isFormValid"
        @click="handleNext"
      >
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
  name: 'BasicInfo',
  setup() {
    const store = useStore()
    const router = useRouter()
     // 添加 exerciseOptions
     const exerciseOptions = [
      {
        value: 'never',
        label: '几乎不运动',
        desc: '每周运动次数少于1次',
        icon: 'tv-o'
      },
      {
        value: 'occasionally',
        label: '偶尔运动',
        desc: '每周运动1-2次',
        icon: 'walking-o'
      },
      {
        value: 'regularly',
        label: '经常运动',
        desc: '每周运动3-4次',
        icon: 'run-circle-o'
      },
      {
        value: 'frequently',
        label: '频繁运动',
        desc: '每周运动5次以上',
        icon: 'medal-o'
      }
    ]
    // 添加 handleExerciseSelect
    const handleExerciseSelect = async (value) => {
      userInfo.value.exerciseFrequency = value
      await smoothScroll(educationRef)
    }
// 在 setup 函数中添加
const bmiValue = computed(() => {
  if (!userInfo.value.height || !userInfo.value.weight) return 0
  const heightInMeter = userInfo.value.height / 100
  return userInfo.value.weight / (heightInMeter * heightInMeter)
})

const bmiStatus = computed(() => {
  const currentBmi = bmiValue.value
  if (!currentBmi) return { label: '', class: '', description: '' }
  if (currentBmi < 17.5) return { 
    label: '偏瘦', 
    class: 'warning',
    description: '建议适当增加营养摄入，保持健康饮食习惯。'
  }
  if (currentBmi <= 24.9) return { 
    label: '标准', 
    class: 'success',
    description: '恭喜！你的体重处于健康范围，继续保持。'
  }
  if (currentBmi <= 27.9) return { 
    label: '偏重', 
    class: 'warning',
    description: '建议适当控制饮食，增加运动量。'
  }
  return { 
    label: '肥胖', 
    class: 'danger',
    description: '建议咨询医生或营养师，制定健康的减重计划。'
  }
})




    // 组件挂载时自动滚动到顶部
    onMounted(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })

    const ageGroupRef = ref(null)
    const healthRef = ref(null) 
    const educationRef = ref(null)
    const occupationRef = ref(null)
    const locationRef = ref(null)
    const nextButtonRef = ref(null)

    const userInfo = ref({
      ageGroup: '', 
      education: '',
      occupation: '',
      height: 170,
      weight: 60,
      exerciseFrequency: '', 
      cityTier: '',
      areaLocation: ''
    })

    const ageOptions = [
      { value: '18-23', label: '18-23岁', desc: '青春活力' },
      { value: '24-30', label: '24-30岁', desc: '事业上升期' },
      { value: '31-40', label: '31-40岁', desc: '成熟稳重' },
      { value: '40+', label: '40岁以上', desc: '成就人生' }
    ];

    const educationOptions = [
      { label: '硕士及以上', value: 'master', icon: 'award-o' },
      { label: '本科', value: 'bachelor', icon: 'certificate' },
      { label: '大专', value: 'college', icon: 'bookmark-o' },
      { label: '其他', value: 'other', icon: 'notes-o' }
    ]

    const jobOptions = [
      { label: '公务员/事业单位', value: 'government', icon: 'manager' },
      { label: '国企/外企', value: 'state-owned', icon: 'hotel-o' },
      { label: '私企正式', value: 'private', icon: 'shop-o' },
      { label: '其他', value: 'other', icon: 'more-o' }
    ]

    const cityTierOptions = [
      { 
        label: '一线城市', 
        value: 'first-tier',
        icon: 'star',
        desc: '北上广深' 
      },
      { 
        label: '新一线', 
        value: 'new-first-tier',
        icon: 'like',
        desc: '成都、杭州等' 
      },
      { 
        label: '二线城市', 
        value: 'second-tier',
        icon: 'location',
        desc: '省会城市' 
      },
      { 
        label: '三线及以下', 
        value: 'other',
        icon: 'home-o',
        desc: '其他城市' 
      }
    ]

    const areaOptions = [
      { 
        label: '市中心', 
        value: 'downtown',
        icon: 'gem-o',
        desc: '核心商圈' 
      },
      { 
        label: '城市副中心', 
        value: 'sub-center',
        icon: 'diamond-o',
        desc: '规划成熟' 
      },
      { 
        label: '远郊区域', 
        value: 'suburb',
        icon: 'flower-o',
        desc: '基础完备' 
      },
      { 
        label: '其他', 
        value: 'other',
        icon: 'more-o',
        desc: '其他区域' 
      }
    ]



  

    const isFormValid = computed(() => {
        return userInfo.value.ageGroup &&
              userInfo.value.height &&
              userInfo.value.weight &&
              userInfo.value.exerciseFrequency &&
              userInfo.value.education &&
              userInfo.value.occupation &&
              userInfo.value.cityTier &&
              userInfo.value.areaLocation
      })

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

    const handleAgeGroupSelect = async (value) => {
      userInfo.value.ageGroup = value
      await smoothScroll(healthRef)
    }

    const handleEducationSelect = async (value) => {
      userInfo.value.education = value
      await smoothScroll(occupationRef)
    }

    const handleOccupationSelect = async (value) => {
      userInfo.value.occupation = value
      await smoothScroll(locationRef)
    }

    const handleCityTierSelect = (value) => {
      userInfo.value.cityTier = value
    }

    const handleAreaLocationSelect = async (value) => {
      userInfo.value.areaLocation = value
      if (isFormValid.value) {
        await smoothScroll(nextButtonRef)
      }
    }

    const handleNext = () => {
      store.commit('updateBasic', userInfo.value)
      router.push('/economic').then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })
    }

    return {
      ageGroupRef,
      educationRef,
      occupationRef,
      locationRef,
      nextButtonRef,
      userInfo,
      ageOptions,
      educationOptions,
      jobOptions,
      cityTierOptions,
      areaOptions,
      bmiValue, 
      bmiStatus,
      exerciseOptions,
      isFormValid,
      handleAgeGroupSelect,
      handleEducationSelect,
      handleOccupationSelect,
      handleCityTierSelect,
      handleAreaLocationSelect,
      handleExerciseSelect, 
      handleNext
    }
  }
}
</script>

<style scoped>
.basic-info {
  padding: 16px;
  padding-bottom: 80px;
}

.progress-bar {
  background: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.step-text {
  text-align: center;
  margin-top: 8px;
  color: #666;
}

.section-block {
  margin: 24px 0;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  scroll-margin-top: 80px;
}

h3 {
  margin: 0 0 16px;
  color: #2c3e50;
  font-size: 18px;
}

.education-cards,
.job-cards,
.location-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.edu-card,
.job-card,
.city-card,
.area-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
}

.edu-card.active,
.job-card.active,
.city-card.active,
.area-card.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.body-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.height-slider,
.weight-slider {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-label {
  width: 40px;
  color: #666;
}

.bmi-info {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
}

.success { color: #2ecc71; }
.warning { color: #f1c40f; }
.danger { color: #e74c3c; }

.location-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.location-section {
  width: 100%;
}

.selection-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
  width: 100%;
}

.city-tier,
.area-location {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.city-card,
.area-card {
  position: relative;
  padding: 16px;
  border-radius: 8px;
  background: #f5f7fa;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.age-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.age-card {
  position: relative;
  padding: 16px;
  border-radius: 8px;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.age-card.hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.age-card.active {
  background: #e6f3fc;
  border: 2px solid #3498db;
}

.age-label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.age-desc {
  font-size: 12px;
  color: #666;
}

.bottom-button {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
}

.selection-status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #f56c6c;
  font-size: 13px;
  margin-top: 8px;
}

.location-description {
  margin-bottom: 12px;
  color: #666;
  font-size: 14px;
}

.health-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.body-metrics {
  display: flex;
  gap: 16px;
}

.metric-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-label {
  color: #666;
  font-size: 14px;
}

.bmi-display {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
}

.bmi-value {
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.bmi-label {
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 12px;
}

.bmi-underweight { color: #e67e22; }
.bmi-normal { color: #27ae60; }
.bmi-overweight { color: #f39c12; }
.bmi-obese { color: #e74c3c; }

.bmi-description {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.exercise-section {
  margin-top: 20px;
}

.exercise-section h4 {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

.exercise-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.exercise-card {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.exercise-card.hover-effect:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.exercise-card.active {
  background-color: #e8f4fc;
  border-color: #3498db;
}

.card-icon {
  margin-right: 12px;
  color: #3498db;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.option-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.option-desc {
  font-size: 12px;
  color: #666;
}

.frequency-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.frequency-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.frequency-card.active {
  background: #e6f3fc;
  border: 2px solid #3498db;
}

.freq-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.freq-label {
  font-size: 14px;
  font-weight: 500;
}

.freq-desc {
  font-size: 12px;
  color: #666;
}
</style>
