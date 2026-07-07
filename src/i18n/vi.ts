export const vi = {
  gameTitle: 'Người Sắt',
  gameSubtitle: 'Phiêu Lưu Toán Học',
  tagline: 'Khám phá • Chiến đấu • Học toán!',

  start: {
    play: '▶ Bắt đầu',
    mute: '🔇 Tắt tiếng',
    unmute: '🔊 Bật tiếng',
  },

  hud: {
    level: (n: number) => `Cấp ${n}`,
  },

  moveHint: 'Chạm / bấm bản đồ để di chuyển • Chạm quái vật để chiến đấu',

  zoom: {
    overview: 'Bản đồ',
    normal: 'Gần',
    ariaOverview: 'Xem toàn bộ bản đồ',
    ariaNormal: 'Zoom gần',
  },

  combat: {
    battle: '⚡ CHIẾN ĐẤU',
    exit: 'Thoát',
    levelUp: (level: number) => `⭐ LÊN CẤP ${level}! ⭐`,
    reward: (amount: number) => `+${amount} xu 💰`,
    clear: 'Xóa',
    submit: '✓',
    answerPlaceholder: '?',
  },

  vs: {
    vs: 'VS',
    playerName: 'Người Sắt',
  },

  monsters: {
    creeper: 'Creeper',
    bee: 'Ong Vàng',
    zombie: 'Thây Ma',
    enderman: 'Enderman',
    ghast: 'Ghast',
  },

  coinLabel: (amount: number) => `${amount} xu`,
} as const;
