<template>
  <div>
    <LoadingComponent 
      v-if="loading" 
      :loadingText="loadingText" 
    />
    
    <div class="container" v-else>
      <HeaderComponent 
        :dateDisplay="dateDisplay" 
      />
      
      <div v-if="lunarData">
        <LunarInfoCard :lunarData="lunarData" />
        <ZodiacCard :lunarData="lunarData" />
        <FestivalCard 
          v-if="lunarData.festivals.length > 0 || lunarData.otherFestivals.length > 0" 
          :lunarData="lunarData" 
        />
        <YiJiCard :lunarData="lunarData" />
        <GanzhiCard :lunarData="lunarData" />
        <LuCard 
          v-if="lunarData.lu !== '无'" 
          :lunarData="lunarData" 
        />
        <TimeInfoCard :lunarData="lunarData" />
        <JieqiCard :lunarData="lunarData" />
        <EightCharCard :lunarData="lunarData" />
      </div>
      
      <div v-else class="card">
        <h2 class="card-title"><i class="fas fa-exclamation-triangle"></i>{{ convertText('错误') }}</h2>
        <p style="margin-bottom: 15px; line-height: 1.7;">{{ errorMessage }}</p>
        <p style="margin-bottom: 20px; color: var(--text-light);">请检查网络连接后重试，或稍后再试。</p>
        <button class="retry-btn" @click="reloadPage">
          <i class="fas fa-sync-alt"></i>{{ convertText('重新加载') }}
        </button>
      </div>
      
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import LunarInfoCard from '@/components/LunarInfoCard.vue'
import ZodiacCard from '@/components/ZodiacCard.vue'
import FestivalCard from '@/components/FestivalCard.vue'
import YiJiCard from '@/components/YiJiCard.vue'
import GanzhiCard from '@/components/GanzhiCard.vue'
import LuCard from '@/components/LuCard.vue'
import TimeInfoCard from '@/components/TimeInfoCard.vue'
import JieqiCard from '@/components/JieqiCard.vue'
import EightCharCard from '@/components/EightCharCard.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'HomeView',
  components: {
    LoadingComponent,
    HeaderComponent,
    LunarInfoCard,
    ZodiacCard,
    FestivalCard,
    YiJiCard,
    GanzhiCard,
    LuCard,
    TimeInfoCard,
    JieqiCard,
    EightCharCard,
    FooterComponent
  },
  data() {
    return {
      loading: true,
      loadingText: "正在載入黃曆數據，請稍候...",
      lunarData: null,
      dateDisplay: "加载中...",
      errorMessage: "",
      isTraditional: true, // 强制默认繁体
      darkMode: false,
      converter: null
    }
  },
  mounted() {
    // 加载用户设置
    this.loadUserSettings();
    
    // 加载简繁体转换库
    this.loadOpenCC().then(() => {
      // 加载黄历数据
      setTimeout(this.loadLunarData, 500);
    }).catch(err => {
      this.showError('加载错误: ' + err.message);
    });
  },
  methods: {
    // 加载OpenCC简繁体转换库
    async loadOpenCC() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.min.js';
        script.onload = () => {
          if (typeof OpenCC !== 'undefined') {
            this.converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
            resolve();
          } else {
            reject(new Error('OpenCC库加载失败'));
          }
        };
        script.onerror = () => reject(new Error('OpenCC库加载失败'));
        document.head.appendChild(script);
      });
    },
    
    // 加载用户设置
    loadUserSettings() {
      // 始终使用系统主题设置
      const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // 更新主题状态函数
      const updateTheme = (e) => {
        this.darkMode = e.matches;
        this.applyTheme();
      };
      
      // 立即设置当前主题
      this.darkMode = colorSchemeQuery.matches;
      this.applyTheme();
      
      // 添加监听器实时响应系统主题变化
      colorSchemeQuery.addEventListener('change', updateTheme);
    },
    
    // 应用主题样式
    applyTheme() {
      document.body.classList.toggle('dark-theme', this.darkMode);
    },
    
    // 加载黄历数据
    async loadLunarData() {
      try {
        this.loadingText = "正在初始化农历库...";
        
        // 加载lunar库
        await this.loadLunarLibrary();
        
        this.loadingText = "正在计算黄历数据...";
        
        // 安全加载农历库
        const lunar = this.safeLunarLoad();
        
        const now = new Date();
        
        // 格式化日期
        const dateStr = now.toLocaleDateString('zh-CN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          weekday: 'long'
        });
        
        this.dateDisplay = dateStr;
        
        // 获取节气表
        const jieqiTable = lunar.getJieQiTable();
        const jieqiList = [];
        for (const [key, value] of Object.entries(jieqiTable)) {
          jieqiList.push(`${key}: ${value}`);
        }
        
        // 获取当天所有时辰
        const times = lunar.getTimes();
        const timeList = [];
        if (times) {
          times.forEach(time => {
            // 强化类型检测：区分日期对象和干支对象
            let solarDate = null;
            
            // 检查是否是干支对象（含有getGan/getZhi方法）
            if (typeof time === 'object' && time !== null && 
                typeof time.getGan === 'function' && 
                typeof time.getZhi === 'function') {
              // 该对象是干支对象而非日期对象，直接记录名称
              timeList.push(`${time.name}: 干支时段`);
              return;
            }
            
            // 常规日期对象处理流程
            if (time.solar) {
              if (time.solar instanceof Date) {
                solarDate = time.solar;
              } else if (typeof time.solar === 'string') {
                solarDate = new Date(time.solar);
                if (isNaN(solarDate)) {
                  const dateParts = time.solar.match(/(\d{4})-(\d{2})-(\d{2})/);
                  if (dateParts) {
                    solarDate = new Date(parseInt(dateParts[1]), parseInt(dateParts[2])-1, parseInt(dateParts[3]));
                  }
                }
              } else if (typeof time.solar === 'number') {
                solarDate = new Date(time.solar);
              }
            }
            
            // 格式化有效日期
            if (solarDate && !isNaN(solarDate)) {
              const timeStr = `${solarDate.getHours()}:${solarDate.getMinutes()}:${solarDate.getSeconds()}`;
              timeList.push(`${time.name}: ${solarDate.toISOString().split('T')[0]} ${timeStr}`);
            } else if (!time.solar) {
              // 处理无日期信息的情况
              timeList.push(`${time.name}: 日期信息缺失`);
            } else {
              console.warn(`未识别的日期格式：`, time.solar);
              timeList.push(`${time.name}: 不支持的日期格式`);
            }
          });
        }
        
        // 保存数据
        this.lunarData = {
          date: lunar.getMonthInChinese() + '月' + lunar.getDayInChinese() ,  // 修改为仅显示月日
          ganzhiYear: lunar.getYearInGanZhi(),
          ganzhiYearLiChun: lunar.getYearInGanZhiByLiChun(),
          ganzhiYearExact: lunar.getYearInGanZhiExact(),
          ganzhiMonth: lunar.getMonthInGanZhi(),
          ganzhiMonthExact: lunar.getMonthInGanZhiExact(),
          ganzhiDay: lunar.getDayInGanZhi(),
          ganzhiDayExact: lunar.getDayInGanZhiExact(),
          zodiacYear: lunar.getYearShengXiao(),
          zodiacMonth: lunar.getMonthShengXiao(),
          zodiacDay: lunar.getDayShengXiao(),
          timeGan: lunar.getTimeGan(),
          timeZhi: lunar.getTimeZhi(),
          timeGanzhi: lunar.getTimeInGanZhi(),
          timeShengxiao: lunar.getTimeShengXiao(),
          week: lunar.getWeekInChinese(),
          jieqi: lunar.getJieQi() || '无',
          prevJieqi: lunar.getPrevJieQi(false) ? lunar.getPrevJieQi(false).getName() : '无',
          prevJieqiDate: lunar.getPrevJieQi(false) ? lunar.getPrevJieQi(false).getSolar().toYmd() : '无',
          nextJieqi: lunar.getNextJieQi(false) ? lunar.getNextJieQi(false).getName() : '无',
          nextJieqiDate: lunar.getNextJieQi(false) ? lunar.getNextJieQi(false).getSolar().toYmd() : '无',
          jieqiList: jieqiList,
          timeList: timeList,
          eightChar: `${lunar.getYearInGanZhi()}年${lunar.getMonthInGanZhi()}月${lunar.getDayInGanZhi()}日${lunar.getTimeInGanZhi()}时`,
          festivals: lunar.getFestivals() || [],
          otherFestivals: lunar.getOtherFestivals() || [],
          lu: lunar.getDayLu() || '无',
          yi: lunar.getDayYi() || [],
          ji: lunar.getDayJi() || [],
          moonPhase: lunar.getYueXiang() || '无'
        };
        
        // 隐藏加载状态，显示内容
        this.loading = false;
        
      } catch (err) {
        this.showError('加载错误: ' + err.message);
        console.error(err);
      }
    },
    
    // 加载lunar库
    async loadLunarLibrary() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lunar-javascript@1.7.2/lunar.min.js';
        script.onload = () => {
          if (typeof Lunar !== 'undefined') {
            resolve();
          } else {
            reject(new Error('Lunar库加载失败'));
          }
        };
        script.onerror = () => reject(new Error('Lunar库加载失败'));
        document.head.appendChild(script);
      });
    },
    
    // 安全加载lunar库
    safeLunarLoad() {
      // 确保Lunar对象可用
      if (typeof Lunar === 'undefined' || !Lunar.fromDate) {
        throw new Error('Lunar库加载失败，请检查网络连接');
      }
      
      // 创建日期对象
      const now = new Date();
      if (isNaN(now)) {
        throw new Error('无效的日期对象');
      }
      
      // 创建农历对象
      const lunar = Lunar.fromDate(now);
      if (!lunar) {
        throw new Error('农历对象创建失败');
      }
      
      return lunar;
    },
    
    // 文本转换
    convertText(text) {
      return this.isTraditional && this.converter ? this.converter(text) : text;
    },
    
    // 显示错误
    showError(message) {
      this.loading = false;
      this.errorMessage = message;
      this.lunarData = null;
    },
    
    // 重新加载页面
    reloadPage() {
      window.location.reload();
    }
  }
}
</script>
