<template>
  <div class="result">
    <!-- 总分展示 -->
    <div class="score-section">
      <div class="avatar-wrapper">
        <img :src="rankAvatar" :alt="rankTitle" class="rank-avatar" />
      </div>
      <div class="rank-info">
        <div class="rank-badge" :style="{ backgroundColor: rankColor }">
          <span class="rank-name">{{ rankTitle }}</span>
          <span class="rank-level">{{ rankLevel }}</span>
        </div>
        <h2 class="score-title">相亲指数评估结果</h2>
        <div class="total-score">
          <van-circle
            v-model="currentRate"
            :rate="totalScore"
            :speed="100"
            :size="120"
            :color="rankColor"
            :layer-color="'#ebedf0'"
            :stroke-width="10"
            :text="totalScore + '分'"
          />
        </div>
      </div>
      <div class="rank-comment" :style="{ color: rankColor }">
        {{ rankComment }}
      </div>
      <div class="rank-description">
        {{ rankDescription }}
      </div>
    </div>

    <!-- 分项得分 -->
    <div class="detail-section">
      <h3 class="section-title">技能加点</h3>
      <div v-for="(item, index) in scoreDetails" :key="index" class="score-item">
        <div class="item-header">
          <div class="item-title-group">
            <van-icon :name="item.icon" :color="item.color" size="20" />
            <span class="item-title">{{ item.title }}</span>
          </div>
          <span class="item-score" :style="{ color: item.color }">{{ item.score }}分</span>
        </div>
        <van-progress
          :percentage="(item.score / item.total) * 100"
          :color="item.color"
          :pivot-text="`Lv.${Math.floor((item.score / item.total) * 10)}`"
          :stroke-width="8"
        />
        <div class="item-tags">
          <van-tag 
            v-for="(tag, tagIndex) in item.tags" 
            :key="tagIndex"
            :color="tag.color"
            plain
            round
            size="medium"
            style="margin: 4px"
          >
            {{ tag.text }}
          </van-tag>
        </div>
      </div>
    </div>

    <!-- 建议改进 -->
    <div class="suggestions-section">
      <h3 class="section-title">
        <van-icon name="guide-o" color="#2c3e50" size="20" style="margin-right: 6px" />
        装备推荐
      </h3>
      <van-cell-group inset class="suggestion-list">
        <van-cell
          v-for="(suggestion, index) in suggestions"
          :key="index"
          :title="suggestion.title"
          :label="suggestion.content"
          :icon="suggestion.icon"
          :class="{ 'important-suggestion': suggestion.important }"
        />
      </van-cell-group>
    </div>

    <!-- 底部按钮 -->
    <div class="action-buttons">
      <van-button round block type="primary" size="large" @click="shareResult">
        <van-icon name="share-o" size="18" style="margin-right: 4px" />
        炫耀成绩
      </van-button>
      <van-button round block plain type="primary" size="large" @click="restartTest" style="margin-top: 12px">
        <van-icon name="replay" size="18" style="margin-right: 4px" />
        重新挑战
      </van-button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Result',
  setup() {
    const router = useRouter()
    const store = useStore()
    const currentRate = ref(0)

    const totalScore = computed(() => {
  const scores = store.state.scores
  const scoreItems = ['basic', 'economic', 'family', 'potential', 'attitude']
  return Math.round(
    scoreItems.reduce((sum, key) => sum + (scores[key] || 0), 0)
  )
})

    // 根据分数计算段位
    const rankInfo = computed(() => {
      const score = totalScore.value
      if (score >= 90) {
        return {
          title: '王者',
          level: '荣耀王者',
          color: '#F0C744',
          avatar: '/ranks/king.png',
          comment: '天选之子，万中无一！',
          description: '恭喜你！你的相亲指数已经突破天际！不仅事业有成、相貌出众，还有着迷人的魅力和成熟的婚恋观。这样的你，绝对是婚恋市场的顶级玩家！建议你赶紧出道，不然优质对象就要被抢光啦！'
        }
      }
      if (score >= 80) {
        return {
          title: '钻石',
          level: '永恒钻石',
          color: '#4CABE9',
          avatar: '/ranks/diamond.png',
          comment: '钻石王老五预定！',
          description: '哇！你的相亲指数相当亮眼！事业稳定、个人魅力十足，就像一颗闪耀的钻石一样迷人。虽然还有一点小瑕疵，但瑕不掩瑜，你已经是相亲市场的香饽饽啦！'
        }
      }
      if (score >= 70) {
        return {
          title: '黄金',
          level: '秩序黄金',
          color: '#FFB347',
          avatar: '/ranks/gold.png',
          comment: '潜力股，即将起飞！',
          description: '不错不错！你的相亲指数已经超越大部分人啦！虽然还不是最顶尖的，但胜在发展潜力大、个性讨喜。继续保持，说不定很快就能升级成钻石王老五/女王啦！'
        }
      }
      if (score >= 60) {
        return {
          title: '白银',
          level: '倔强白银',
          color: '#B4B4B4',
          avatar: '/ranks/silver.png',
          comment: '还行还行，有点东西！',
          description: '嘿！你的相亲指数刚刚及格，虽然不是最亮眼的，但也有自己的闪光点。只要继续努力提升自己，相信很快就能在相亲市场脱颖而出！加油，看好你哦！'
        }
      }
      return {
        title: '青铜',
        level: '坚韧青铜',
        color: '#CD7F32',
        avatar: '/ranks/bronze.png',
        comment: '兄弟/姐妹，咱们继续努力！',
        description: 'emmm...你的相亲指数还有很大提升空间哦！不要灰心，每个王者都是从青铜段位一步步打上来的。按照我们的建议好好提升自己，假以时日，你也能成为相亲市场的热门选手！'
      }
    })

    const rankTitle = computed(() => rankInfo.value.title)
    const rankLevel = computed(() => rankInfo.value.level)
    const rankColor = computed(() => rankInfo.value.color)
    const rankAvatar = computed(() => rankInfo.value.avatar)
    const rankComment = computed(() => rankInfo.value.comment)
    const rankDescription = computed(() => rankInfo.value.description)

    const scoreColor = computed(() => {
      const score = totalScore.value
      if (score >= 80) return '#07c160'
      if (score >= 60) return '#3498db'
      return '#ee0a24'
    })

    const scoreDescription = computed(() => {
      const score = totalScore.value
      if (score >= 80) return '您的相亲指数非常优秀！'
      if (score >= 60) return '您的相亲指数良好，仍有提升空间。'
      return '建议您在某些方面需要改进。'
    })

    const scoreLevel = computed(() => {
      const score = totalScore.value
      if (score >= 90) return '非常优秀'
      if (score >= 80) return '优秀'
      if (score >= 70) return '良好'
      if (score >= 60) return '及格'
      return '需要改进'
    })

    const scoreDetails = computed(() => [
      {
        title: '基本信息',
        score: store.state.scores.basic || 0,
        total: 20,
        color: '#3498db',
        icon: 'contact',
        tags: [
          { text: '年龄合适', color: '#3498db' },
          { text: '身高标准', color: '#07c160' }
        ]
      },
      {
        title: '经济状况',
        score: store.state.scores.economic || 0,
        total: 20,
        color: '#07c160',
        icon: 'gold-coin',
        tags: [
          { text: '收入稳定', color: '#3498db' },
          { text: '有房产', color: '#07c160' }
        ]
      },
      {
        title: '家庭背景',
        score: store.state.scores.family || 0,
        total: 20,
        color: '#ff9800',
        icon: 'friends',
        tags: [
          { text: '家庭和睦', color: '#07c160' },
          { text: '负担较轻', color: '#3498db' }
        ]
      },
      {
        title: '发展潜力',
        score: store.state.scores.potential || 0,
        total: 20,
        color: '#9c27b0',
        icon: 'chart-trending-o',
        tags: [
          { text: '上升空间大', color: '#07c160' },
          { text: '学习能力强', color: '#3498db' }
        ]
      },
      {
        title: '婚恋态度',
        score: store.state.scores.attitude || 0,
        total: 20,
        color: '#e91e63',
        icon: 'like',
        tags: [
          { text: '态度积极', color: '#07c160' },
          { text: '观念成熟', color: '#3498db' }
        ]
      }
    ])

    const suggestions = computed(() => {
      const score = totalScore.value
      const baseSuggestions = [
        {
          title: '提升经济实力',
          content: '建议制定理财计划，提高收入能力',
          icon: 'gold-coin-o'
        },
        {
          title: '扩展社交圈',
          content: '多参加社交活动，增加结识优质对象的机会',
          icon: 'friends-o'
        },
        {
          title: '提升个人魅力',
          content: '注意个人形象，培养兴趣爱好',
          icon: 'smile-o'
        }
      ]

      if (score < 60) {
        baseSuggestions.push({
          title: '调整婚恋观念',
          content: '建议以更开放和积极的心态看待婚恋',
          icon: 'like-o'
        })
      }

      return baseSuggestions
    })

    const shareResult = () => {
      console.log('分享结果')
    }

    const restartTest = () => {
      store.commit('resetScores')
      router.push('/')
    }

    onMounted(async () => {
  currentRate.value = totalScore.value
  await nextTick()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

    return {
      currentRate,
      totalScore,
      rankTitle,
      rankLevel,
      rankColor,
      rankAvatar,
      rankComment,
      rankDescription,
      scoreDetails,
      suggestions,
      shareResult,
      restartTest
    }
  }
}
</script>

<style scoped>
.result {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.score-section {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.avatar-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 60px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.rank-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rank-info {
  margin-bottom: 20px;
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.rank-name {
  font-size: 20px;
  margin-right: 8px;
}

.rank-level {
  font-size: 16px;
  opacity: 0.9;
}

.rank-comment {
  font-size: 24px;
  font-weight: 600;
  margin: 16px 0;
}

.rank-description {
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 500px;
}

.detail-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.score-item {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.score-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-title {
  font-size: 16px;
  color: #2c3e50;
  font-weight: 500;
}

.item-score {
  font-size: 18px;
  font-weight: 600;
}

.item-tags {
  margin-top: 12px;
}

.suggestions-section {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.suggestion-list {
  border-radius: 8px;
  overflow: hidden;
}

.important-suggestion {
  background-color: #fff9f9;
}

.action-buttons {
  padding: 20px;
  position: sticky;
  bottom: 0;
  background: white;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

:deep(.van-circle__text) {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

:deep(.van-cell) {
  padding: 16px;
}

:deep(.van-cell__title) {
  font-size: 15px;
  font-weight: 500;
}

:deep(.van-cell__label) {
  font-size: 14px;
  margin-top: 4px;
}

:deep(.van-tag--medium) {
  padding: 0 12px;
  height: 28px;
  line-height: 26px;
}
</style>
