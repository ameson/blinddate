<template>
  <div class="result-page">
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
      <div class="related-test-section">
        <a href="https://cuckold.qioo.fun/" target="_blank" class="related-link">
          想知道你的绿帽指数吗？点击测试 →
        </a>
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
    <!-- 二维码部分 -->
    <div class="qr-section">
      <h3 class="section-title">
        <van-icon name="qr" color="#2c3e50" size="20" style="margin-right: 6px" />
        关注我们
      </h3>
      <div class="qr-content">
  <img :src="qrCodeImage" alt="关注二维码" class="qr-image" />
  <p class="qr-tip">扫码关注，获取更多婚恋指南</p>
</div>
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
    <!-- 隐私申明和联系方式 -->
    <div class="privacy-section">
      <div class="privacy-content">
        <h3 class="section-title">
          <van-icon name="shield-o" color="#2c3e50" size="20" style="margin-right: 6px" />
          隐私申明
        </h3>
        <p class="privacy-text">
          本测试仅供娱乐，测试结果不具备任何权威性和科学性。我们承诺：
        </p>
        <ul class="privacy-list">
          <li>不会收集您的个人隐私信息</li>
          <li>不会记录或存储您的测试数据</li>
          <li>不会向任何第三方分享您的信息</li>
        </ul>
      </div>
      
      <div class="contact-content">
        <h3 class="section-title">
          <van-icon name="service-o" color="#2c3e50" size="20" style="margin-right: 6px" />
          联系我们
        </h3>
        <p class="contact-text">
          如果您有任何问题、建议或合作意向，欢迎通过以下方式联系我们：
        </p>
        <div class="contact-list">
          <div class="contact-item">
            <van-icon name="envelop-o" size="16" style="margin-right: 4px" />
            邮箱：blinddate@temp.now
          </div>
          <div class="contact-item">
            <van-icon name="wechat" size="16" style="margin-right: 4px" />
            微信：xxxxx
          </div>
        </div>
      </div>
    </div>

    <!-- 分享卡片容器 -->
    <div v-show="showShareCard" ref="shareCardRef" class="share-card-container">
      <div class="share-card">
        <div class="share-content">
          <div class="share-title-header">
            <h2>相亲指数测试结果</h2>
          </div>
          <div class="share-header">
            <img :src="rankAvatar" :alt="rankTitle" class="share-avatar" crossorigin="anonymous" />
            <div class="share-title">
              <div class="share-badge" :style="{ backgroundColor: rankColor }">
                <span class="share-rank">{{ rankTitle }}</span>
                <span class="share-level">{{ rankLevel }}</span>
              </div>
              <div class="share-score">
                <span :style="{ color: rankColor }">{{ totalScore }}分</span>
              </div>
            </div>
          </div>
          <div class="share-details">
            <div v-for="(item, index) in scoreDetails" :key="index" class="share-detail-item">
              <span class="share-item-title">{{ item.title }}</span>
              <div class="share-item-score" :style="{ color: item.color }">{{ item.score }}分</div>
            </div>
          </div>
          <div class="share-comment" :style="{ color: rankColor }">{{ rankComment }}</div>
          <div class="share-qr">
  <img :src="qrCodeImage" alt="二维码" class="share-qr-image" crossorigin="anonymous" ref="qrImageRef" />
  <div class="share-footer">长按识别二维码，测试你的相亲指数</div>
</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { showToast } from 'vant'
import html2canvas from 'html2canvas'
import qrCodeImage from '@/assets/qr.jpg'  

const qrImageRef = ref(null)

// 预加载二维码图片
const preloadQRImage = () => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve()
    img.onerror = reject
    img.src = qrCodeImage
  })
}

const shareResult = async () => {
  try {
    showToast({
      message: '正在生成分享图片...',
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner'
    })
    
    // 确保二维码图片已加载
    await preloadQRImage()
    
    showShareCard.value = true
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 800))

    const shareCard = shareCardRef.value
    if (!shareCard) {
      throw new Error('分享卡片元素未找到')
    }

    // 确保二维码图片已完全加载
    if (qrImageRef.value) {
      await new Promise((resolve) => {
        if (qrImageRef.value.complete) {
          resolve()
        } else {
          qrImageRef.value.onload = resolve
        }
      })
    }

    shareCard.style.cssText = 'visibility: visible; position: fixed; left: 0; top: 0; z-index: 1000; background: white; width: 375px; height: auto;'

    const canvas = await html2canvas(shareCard, {
      useCORS: true,
      allowTaint: true,
      scale: window.devicePixelRatio * 1.5,
      backgroundColor: '#ffffff',
      logging: true,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('.share-card-container')
        if (clonedElement) {
          clonedElement.style.cssText = 'position: relative; visibility: visible; z-index: auto; width: 375px; height: auto;'
        }
      }
    })

    const imgUrl = canvas.toDataURL('image/png', 0.95)
    
    const link = document.createElement('a')
    const fileName = `相亲指数_${totalScore.value}分_${new Date().getTime()}.png`
    link.download = fileName
    link.href = imgUrl
    link.click()

    showToast.clear()
    showToast({
      message: '图片已保存',
      type: 'success'
    })
  } catch (error) {
    console.error('生成分享图片失败:', error)
    showToast({
      message: '生成图片失败，请重试',
      type: 'error'
    })
  } finally {
    if (shareCardRef.value) {
      shareCardRef.value.style.cssText = 'visibility: hidden; position: fixed; left: -9999px; top: -9999px; z-index: -1;'
    }
    showShareCard.value = false
  }
}

const router = useRouter()
const store = useStore()
const currentRate = ref(0)
const showShareCard = ref(false)
const shareCardRef = ref(null)

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
      avatar: '/ranks/king.svg',
      comment: '天选之子，万中无一！',
      description: '恭喜你！你的相亲指数已经突破天际！不仅事业有成、相貌出众，还有着迷人的魅力和成熟的婚恋观。这样的你，绝对是婚恋市场的顶级玩家！建议你赶紧出道，不然优质对象就要被抢光啦！'
    }
  }
  if (score >= 80) {
    return {
      title: '钻石',
      level: '永恒钻石',
      color: '#4CABE9',
      avatar: '/ranks/diamond.svg',
      comment: '钻石王老五预定！',
      description: '哇！你的相亲指数相当亮眼！事业稳定、个人魅力十足，就像一颗闪耀的钻石一样迷人。虽然还有一点小瑕疵，但瑕不掩瑜，你已经是相亲市场的香饽饽啦！'
    }
  }
  if (score >= 70) {
    return {
      title: '黄金',
      level: '秩序黄金',
      color: '#FFB347',
      avatar: '/ranks/gold.svg',
      comment: '潜力股，即将起飞！',
      description: '不错不错！你的相亲指数已经超越大部分人啦！虽然还不是最顶尖的，但胜在发展潜力大、个性讨喜。继续保持，说不定很快就能升级成钻石王老五/女王啦！'
    }
  }
  if (score >= 60) {
    return {
      title: '白银',
      level: '倔强白银',
      color: '#B4B4B4',
      avatar: '/ranks/silver.svg',
      comment: '还行还行，有点东西！',
      description: '嘿！你的相亲指数刚刚及格，虽然不是最亮眼的，但也有自己的闪光点。只要继续努力提升自己，相信很快就能在相亲市场脱颖而出！加油，看好你哦！'
    }
  }
  return {
    title: '青铜',
    level: '坚韧青铜',
    color: '#CD7F32',
    avatar: '/ranks/bronze.svg',
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
  try {
    await preloadQRImage()
  } catch (error) {
    console.error('二维码图片加载失败:', error)
  }
})
</script>

<style scoped>
.result-page {
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
  margin: 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.related-test-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0fff4;
  border-radius: 12px;
}

.related-link {
  color: #2ecc71;
  text-decoration: none;
  font-size: 16px;
  display: block;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.related-link:hover {
  background-color: #2ecc71;
  color: white;
  transform: translateY(-2px);
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

.qr-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.qr-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.qr-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
}

.qr-tip {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.share-card-container {
  position: fixed;
  left: -9999px;
  top: -9999px;
  width: 375px;
  background: white;
  z-index: -1;
  visibility: hidden;
}

.share-card {
  width: 375px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.share-title-header {
  text-align: center;
  margin-bottom: 20px;
}

.share-title-header h2 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  font-weight: 600;
}

.share-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.share-avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
}

.share-title {
  flex: 1;
}

.share-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
}

.share-rank {
  font-size: 18px;
  margin-right: 8px;
}

.share-level {
  font-size: 14px;
  opacity: 0.9;
}

.share-score {
  font-size: 24px;
  font-weight: bold;
}

.share-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.share-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 8px;
}

.share-item-title {
  font-size: 14px;
  color: #666;
}

.share-item-score {
  font-size: 16px;
  font-weight: 600;
}

.share-comment {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 12px 0;
}

.share-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.share-qr-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.share-footer {
  font-size: 12px;
  color: #666;
  text-align: center;
}

/* 隐私申明和联系方式样式 */
.privacy-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.privacy-content,
.contact-content {
  margin-bottom: 24px;
}

.privacy-content:last-child,
.contact-content:last-child {
  margin-bottom: 0;
}

.privacy-text,
.contact-text {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 12px 0;
}

.privacy-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.privacy-list li {
  position: relative;
  padding-left: 20px;
  margin: 8px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.privacy-list li::before {
  content: "•";
  position: absolute;
  left: 8px;
  color: #2c3e50;
}

.contact-list {
  margin-top: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.6;
}
</style>
