import { SOCIAL_SHARE_TEXT } from '@/constants/app';

export const socialShareUtils = {
  getShareText: (title: string) => SOCIAL_SHARE_TEXT.RESULT_TEMPLATE(title),
  
  getShareUrl: () => window.location.href,
  
  shareToTwitter: (title: string) => {
    const text = socialShareUtils.getShareText(title);
    const url = socialShareUtils.getShareUrl();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  },
  
  shareToFacebook: () => {
    const url = socialShareUtils.getShareUrl();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  },
  
  shareToWhatsApp: (title: string) => {
    const text = socialShareUtils.getShareText(title);
    const url = socialShareUtils.getShareUrl();
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      '_blank'
    );
  },
  
  copyToClipboard: async (url: string): Promise<void> => {
    await navigator.clipboard.writeText(url);
  }
};
