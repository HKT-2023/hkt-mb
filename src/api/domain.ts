const domain = {
  authentication: {
    login: '/api/v1/auth/login',
    googleLogin: '/api/v1/auth/login-with-google',
    appleLogin: '/api/v1/auth/login-with-apple',
  },
  userManagement: {
    information: '/api/v1/user/information',
    changePassword: '/api/v1/user/change-password',
    forgotPassword: (email: string) => `/api/v1/user/forgot-password/${email}`,
    validateCode: '/api/v1/user/validate-code',
    resetPassword: '/api/v1/user/reset-password',
    getAuthHash: '/api/v1/user/auth-hash',
    updateUser: '/api/v1/user/update-user',
    updateAgentUser: '/api/v1/user/update-agent-user',
    updateVendorUser: '/api/v1/user/update-vendor-user',
    viewLeaderboard: '/api/v1/user/view-leaderboard',
    viewOtherLeaderboard: '/api/v1/user/view-other-leaderboard',
    setUp2FA: '/api/v1/user/set-up-2fa',
    validatePhoneCode: '/api/v1/user/validate-phone-code',
    sendOtp: '/api/v1/user/send-otp',
    verifyOtp: '/api/v1/user/verify-otp',
    agentHomepage: '/api/v1/user/agent-home-page',
    userHomepage: '/api/v1/user/user-home-page',
    vendorHomepage: '/api/v1/user/vendor-home-page',
  },
  nft: {
    configSell: '/api/v1/nft/config-sell',
    configAuction: '/api/v1/nft/config-auction',
    configOffer: '/api/v1/nft/config-offer',
    cancelConfig: '/api/v1/nft/cancel-config',
    makeOffer: '/api/v1/nft/make-offer',
    cancelOffer: '/api/v1/nft/cancel-offer',
    approveOffer: '/api/v1/nft/approve-offer',
    rejectOffer: '/api/v1/nft/reject-offer',
    NFTMarketPlace: '/api/v1/nft/NFT-market-place',
    buyNFTFixedPrice: '/api/v1/nft/buy-NFT-at-fixed-price',
    listOffers: '/api/v1/nft/list-offer',
    makeBid: '/api/v1/nft/make-bid',
    listBid: '/api/v1/nft/list-bid',
    listSale: '/api/v1/nft/sale-history',
    endAuction: '/api/v1/nft/end-auction',
    estimateFee: '/api/v1/nft/estimate-fee',
  },
  wallet: {
    myWallet: '/api/v1/wallet/my-wallet',
    viewNFT: '/api/v1/wallet/view-NFT',
    viewNFTDetail: (id: string) => `/api/v1/wallet/view-NFT-detail?NFTId=${id}`,
    sendToken: '/api/v1/wallet/sent-token',
    sendNFT: '/api/v1/wallet/sent-NFT',
  },
  default: {
    uploadFiles: '/api/v1/file/upload-files',
  },
  listing: {
    addInterestArea: '/api/v1/listing/add-interest-area',
    searchLocation: (locationOrZipcode: string) =>
      `/api/v1/listing/search-location?locationOrZipcode=${locationOrZipcode}`,
    deleteInterestArea: (mapboxId: string) =>
      `/api/v1/listing/interest-area?mapboxId=${mapboxId}`,
    getInterestArea: '/api/v1/listing/interest-area',
    getListing: '/api/v1/listing',
    listingDetail: (id: string) => `/api/v1/listing/${id}`,
    checkEstimation: (id: string) =>
      `/api/v1/estimation/get-user-estimation?listingId=${id}`,
    getPropertyType: '/api/v1/listing/property-type',
  },
  contactAgentManagement: {
    contactAgent: '/api/v1/contact-agent',
  },
  houseEstimation: {
    checkIn: '/api/v1/estimation/checkin-house',
    estimate: '/api/v1/estimation',
    listOfEstimations: '/api/v1/estimation/list-of-estimation',
  },
  favoriteManagement: {
    favorite: '/api/v1/favorite',
    deleteFavorite: (id: string) => `/api/v1/favorite/${id}`,
  },
  notificationManagement: {
    list: '/api/v1/notification/list',
    read: '/api/v1/notification/read',
    totalUnread: '/api/v1/notification/unread',
  },
  faqManagement: {
    list: '/api/v1/faq/list',
  },
  requestTourManagement: {
    requestTour: '/api/v1/request-tour',
  },
  reportListing: {
    reportListing: '/api/v1/report-listing',
  },
  activityManagement: {
    listActivity: '/api/v1/activity',
    activityDetail: (id: string) => `/api/v1/activity/${id}`,
  },
  courseManagement: {
    getCourses: '/api/v1/course',
    updateCourse: '/api/v1/course',
    claimToken: '/api/v1/course/claim-token',
    getMyCourses: '/api/v1/course/my-course',
    registerCourse: '/api/v1/course/register',
    getDetailCourse: (id: string) => `/api/v1/course/${id}`,
    getProgress: (id: string) => `/api/v1/course/${id}/percent`,
    deleleCourse: (id: string) => `/api/v1/course/${id}`,
  },
  quizManagement: {
    getQuizzes: '/api/v1/quiz',
    getQuizDetail: (id: string) => `/api/v1/quiz/${id}`,
    correctAnswers: (id: string) => `/api/v1/quiz/${id}/correct-answer`,
    postAnswer: '/api/v1/quiz',
  },
  lessonManagement: {
    getLessons: '/api/v1/lesson',
    updateLesson: '/api/v1/lesson',
    getDetailLesson: (id: string) => `/api/v1/lesson/${id}`,
  },
  vendorManagement: {
    vendorCategory: '/api/v1/vendor-category',
    vendorCategoryDetail: (id: string) =>
      `/api/v1/vendor-category/${id}/vendor`,
    vendorServiceDetail: (id: string, vendorId: string) =>
      `/api/v1/vendor-category/${id}/vendor/${vendorId}`,
  },
  reviewManagement: {
    averageRating: '/api/v1/review/ave-rating',
    editReview: (id: string) => `/api/v1/review/${id}`,
    createReview: '/api/v1/review',
    getReview: '/api/v1/review',
    myRating: '/api/v1/review/my-rating',
  },
};

export default domain;
