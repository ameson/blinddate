import { createStore } from 'vuex'

export default createStore({
  state: {
    scores: {
      basic: 0,
      economic: 0,
      family: 0,
      potential: 0,
      attitude: 0
    },
    userInfo: {
      // 基本信息
      basic: {
        age: null,
        education: '',
        occupation: '',
        height: null,
        weight: null,
        city: ''
      },
      // 经济状况
      economic: {
        income: '',
        house: '',
        car: ''
      },
      // 家庭情况
      family: {
        parents: '',
        siblings: '',
        burden: ''
      },
      // 个人发展潜力
      potential: {
        career: '',
        ability: '',
        learning: ''
      },
      // 婚恋态度
      attitude: {
        marriage: '',
        standard: '',
        experience: ''
      }
    }
  },

  mutations: {
    updateBasic(state, payload) {
      state.userInfo.basic = { ...state.userInfo.basic, ...payload }
      // 计算基本信息得分
      let score = 0
      
      // 年龄评分（25-35岁最高分）
      const age = payload.age || state.userInfo.basic.age
      if (age >= 25 && age <= 35) score += 5
      else if (age >= 22 && age < 25) score += 3
      else if (age > 35 && age <= 40) score += 3
      else score += 1

      // 教育评分
      const education = payload.education || state.userInfo.basic.education
      if (education === 'master') score += 5
      else if (education === 'bachelor') score += 4
      else if (education === 'college') score += 3
      else score += 2

      // 身高体重评分（BMI指数）
      const height = payload.height || state.userInfo.basic.height
      const weight = payload.weight || state.userInfo.basic.weight
      if (height && weight) {
        const bmi = weight / ((height / 100) * (height / 100))
        if (bmi >= 18.5 && bmi <= 24.9) score += 5
        else if (bmi >= 17 && bmi < 18.5) score += 3
        else if (bmi > 24.9 && bmi <= 27.9) score += 3
        else score += 1
      }

      // 城市评分
      const city = payload.city || state.userInfo.basic.city
      if (city === 'first') score += 5
      else if (city === 'second') score += 4
      else if (city === 'third') score += 3
      else score += 2

      state.scores.basic = score
    },

    updateEconomic(state, payload) {
      state.userInfo.economic = { ...state.userInfo.economic, ...payload }
      // 计算经济状况得分
      let score = 0

      // 收入评分
      if (payload.income === 'above_500k') score += 8
      else if (payload.income === '200k_500k') score += 6
      else if (payload.income === '100k_200k') score += 4
      else score += 2

      // 房产评分
      if (payload.house === 'multiple') score += 7
      else if (payload.house === 'full') score += 6
      else if (payload.house === 'mortgage') score += 4
      else score += 2

      // 车辆评分
      if (payload.car === 'super_luxury') score += 5
      else if (payload.car === 'luxury') score += 4
      else if (payload.car === 'economic') score += 3
      else score += 1

      state.scores.economic = score
    },

    updateFamily(state, payload) {
      state.userInfo.family = { ...state.userInfo.family, ...payload }
      // 计算家庭情况得分
      let score = 0

      // 父母情况评分
      if (payload.parents === 'both') score += 8
      else if (payload.parents === 'single') score += 6
      else if (payload.parents === 'divorced') score += 4
      else score += 2

      // 兄弟姐妹评分
      if (payload.siblings === 'only') score += 7
      else if (payload.siblings === 'one') score += 6
      else if (payload.siblings === 'two') score += 4
      else score += 2

      // 家庭负担评分
      if (payload.burden === 'none') score += 5
      else if (payload.burden === 'light') score += 4
      else if (payload.burden === 'medium') score += 2
      else score += 1

      state.scores.family = score
    },

    updatePotential(state, payload) {
      state.userInfo.potential = { ...state.userInfo.potential, ...payload }
      // 计算发展潜力得分
      let score = 0

      // 职业发展评分
      if (payload.career === 'fast') score += 8
      else if (payload.career === 'stable') score += 6
      else if (payload.career === 'startup') score += 4
      else score += 2

      // 工作能力评分
      if (payload.ability === 'excellent') score += 7
      else if (payload.ability === 'good') score += 5
      else if (payload.ability === 'average') score += 3
      else score += 1

      // 学习意愿评分
      if (payload.learning === 'continuous') score += 5
      else if (payload.learning === 'occasional') score += 4
      else if (payload.learning === 'passive') score += 2
      else score += 1

      state.scores.potential = score
    },

    updateAttitude(state, payload) {
      state.userInfo.attitude = { ...state.userInfo.attitude, ...payload }
      // 计算婚恋态度得分
      let score = 0

      // 婚恋观评分
      if (payload.marriage === 'positive') score += 8
      else if (payload.marriage === 'neutral') score += 6
      else if (payload.marriage === 'cautious') score += 4
      else score += 2

      // 择偶标准评分
      if (payload.standard === 'personality') score += 7
      else if (payload.standard === 'matching') score += 6
      else if (payload.standard === 'economic') score += 4
      else score += 3

      // 恋爱经历评分
      if (payload.experience === 'few') score += 5
      else if (payload.experience === 'some') score += 4
      else if (payload.experience === 'none') score += 3
      else score += 2

      state.scores.attitude = score
    },

    resetScores(state) {
      state.scores = {
        basic: 0,
        economic: 0,
        family: 0,
        potential: 0,
        attitude: 0
      }
      state.userInfo = {
        basic: {
          age: null,
          education: '',
          occupation: '',
          height: null,
          weight: null,
          city: ''
        },
        economic: {
          income: '',
          house: '',
          car: ''
        },
        family: {
          parents: '',
          siblings: '',
          burden: ''
        },
        potential: {
          career: '',
          ability: '',
          learning: ''
        },
        attitude: {
          marriage: '',
          standard: '',
          experience: ''
        }
      }
    }
  },

  getters: {
    totalScore: (state) => {
      return Object.values(state.scores).reduce((sum, score) => sum + score, 0)
    }
  }
})
