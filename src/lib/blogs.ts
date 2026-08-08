import { supabase, isSupabaseConfigured } from './supabase';

export interface BlogPost {
  id: string | number;
  title: string;
  desc: string;
  image: string;
  meta: string;
  category?: string;
  created_at?: string;
}

const LOCAL_BLOGS_KEY = 'mali_samaj_blogs_data';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'राजस्थान प्रदेश माली-सैनी महासभा के प्रतिनिधिमंडल ने राजधानी में निदेशक जनगणना, राजस्थान को एक महत्वपूर्ण ज्ञापन सौंपा।',
    desc: 'राजस्थान प्रदेश माली-सैनी महासभा के प्रतिनिधिमंडल ने राजधानी में निदेशक जनगणना, राजस्थान को एक महत्वपूर्ण ज्ञापन सौंपा। इस दौरान जाति जनगणना में समाज की विभिन्न उपजातियों को ओर अलग-अलग श्रेणी में दर्ज करने के बजाय जाति कॉलम में केवल ‘सैनी/माली’ अंकित करने की पुरजोर मांग की गई।',
    image: '/images/blog/WhatsApp-Image-2026-07-28-at-3.30.18-PM.webp',
    meta: '31 Jul 2026 • Admin • 1 Comment',
    category: 'मारवाड़',
    created_at: new Date('2026-07-31').toISOString(),
  },
  {
    id: '2',
    title: 'प्रतियोगी परीक्षाओं की तैयारी हेतु मार्गदर्शक सेमिनार',
    desc: 'समाज के युवाओं को प्रतियोगी परीक्षाओं जैसे RAS, IAS, SSC एवं अन्य राजकीय सेवाओं की तैयारी हेतु विशेषज्ञों द्वारा उचित मार्गदर्शन एवं निःशुल्क काउंसलिंग सेमिनार का आयोजन किया गया...',
    image: '/images/blog/WhatsApp-Image-2026-07-24-at-12.16.28-PM-e1784875684874.webp',
    meta: '25 Jul 2026 • Admin • 0 Comments',
    category: 'प्रवास प्रदेश',
    created_at: new Date('2026-07-25').toISOString(),
  },
  {
    id: '3',
    title: 'करियर मार्गदर्शन संगोष्ठी एवं निशुल्क कैरियर कॉउंसलिंग',
    desc: 'माली समाज के विद्यार्थियों के उज्जवल भविष्य के लिए करियर कॉउंसलिंग संगोष्ठी का आयोजन हुआ जिसमें विषय विशेषज्ञों ने बच्चों को भावी करियर विकल्पों के बारे में विस्तार से जानकारी दी...',
    image: '/images/blog/WhatsApp-Image-2026-06-25-at-8.06.49-PM-e1783858401646.webp',
    meta: '22 Jul 2026 • Admin • 2 Comments',
    category: 'मारवाड़',
    created_at: new Date('2026-07-22').toISOString(),
  },
  {
    id: '4',
    title: 'चेन्नई में माली समाज भवन चेन्नई-79 का भूमिपूजन समारोह संपन्न',
    desc: 'चेन्नई के साहूकारपेट क्षेत्र में माली समाज भवन (चेन्नई-79) के निर्माण हेतु भूमिपूजन एवं शिलान्यास समारोह अत्यंत हर्षोल्लास एवं धार्मिक विधि-विधान के साथ संपन्न हुआ...',
    image: '/images/blog/WhatsApp-Image-2026-07-10-at-8.54.44-AM-e1783668865531.webp',
    meta: '18 Jul 2026 • Admin • 5 Comments',
    category: 'प्रवास प्रदेश',
    created_at: new Date('2026-07-18').toISOString(),
  },
  {
    id: '5',
    title: 'विजयादशमी महोत्सव पर शस्त्र पूजन एवं शस्त्र प्रदर्शन कार्यक्रम',
    desc: 'माली सैनी प्रवासी समाज द्वारा विजयादशमी के पावन पर्व पर कुलदेवता एवं शस्त्रों का विधिवत पूजन-अर्चन कर समाज की एकता एवं शक्ति प्रदर्शन का भव्य कार्यक्रम आयोजित किया गया...',
    image: '/images/blog/ChatGPT-Image-Jul-10-2026-12_52_15-PM-Copy.webp',
    meta: '15 Jul 2026 • Admin • 1 Comment',
    category: 'प्रवास प्रदेश',
    created_at: new Date('2026-07-15').toISOString(),
  },
  {
    id: '6',
    title: 'जालोर में नवनियुक्त जिला कलेक्टर का अभिनंदन',
    desc: 'प्रवासी माली समाज जालोर द्वारा नवनियुक्त जिला कलेक्टर का उनके कार्यालय में पहुंचकर साफा पहनाकर, श्रीफल भेंट कर एवं गुलदस्ता देकर आत्मीय अभिनंदन एवं स्वागत किया गया...',
    image: '/images/blog/WhatsApp-Image-2026-07-11-at-5.09.34-PM-e1783771495719.webp',
    meta: '10 Jul 2026 • Admin • 0 Comments',
    category: 'मारवाड़',
    created_at: new Date('2026-07-10').toISOString(),
  },
  {
    id: '7',
    title: 'जालोर के गौरव: आदित्य सोलंकी ने प्रथम प्रयास में उत्तीर्ण की सी.ए. परीक्षा, क्षेत्र में हर्ष का माहौल',
    desc: 'जालोर के गौरव आदित्य सोलंकी ने प्रथम प्रयास में सी.ए. परीक्षा उत्तीर्ण कर समाज का मान बढ़ाया है। उनकी इस उपलब्धि पर परिवार एवं पूरे जालोर क्षेत्र के समाजबंधुओं में हर्ष का माहौल है...',
    image: '/images/blog/dd111.webp',
    meta: '08 Jul 2026 • Admin • 4 Comments',
    category: 'मारवाड़',
    created_at: new Date('2026-07-08').toISOString(),
  },
  {
    id: '8',
    title: 'चिकित्सा शिविर: निशुल्क नेत्र एवं दंत चिकित्सा जाँच',
    desc: 'प्रवासी माली समाज द्वारा आयोजित विशाल निशुल्क चिकित्सा शिविर में सैंकड़ों समाजबंधुओं ने स्वास्थ्य लाभ लिया तथा निशुल्क दवाइयां वितरित की गईं...',
    image: '/images/blog/WhatsApp-Image-2026-07-06-at-12.42.58-PM-e1783841068563.webp',
    meta: '05 Jul 2026 • Admin • 2 Comments',
    category: 'प्रवास प्रदेश',
    created_at: new Date('2026-07-05').toISOString(),
  },
  {
    id: '9',
    title: 'संत शिरोमणि लिखमीदास जी महाराज की जयंती पर भव्य शोभायात्रा',
    desc: 'लिखमीदास जी महाराज की जयंती के शुभ अवसर पर समाजबंधुओं द्वारा भव्य कलश यात्रा एवं शोभायात्रा निकाली गई, जिससे बड़ी संख्या में मातृशक्ति एवं युवा उपस्थित रहे...',
    image: '/images/blog/ganpati.webp',
    meta: '02 Jul 2026 • Admin • 3 Comments',
    category: 'मारवाड़',
    created_at: new Date('2026-07-02').toISOString(),
  },
  {
    id: '10',
    title: 'लेख - शिक्षा का महत्व',
    desc: 'समाज के विकास के लिए शिक्षा ही सबसे सशक्त माध्यम है। हमें हमारे बालकों के साथ-साथ बालिकाओं की उच्च शिक्षा पर भी विशेष बल देना चाहिए ताकि एक सशक्त समाज का निर्माण हो सके...',
    image: '/images/hero_community_banner.png',
    meta: '28 Jun 2026 • Admin • 1 Comment',
    category: 'प्रवास प्रदेश',
    created_at: new Date('2026-06-28').toISOString(),
  }
];

export const getStoredBlogs = (): BlogPost[] => {
  try {
    const raw = localStorage.getItem(LOCAL_BLOGS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading blogs from localStorage', e);
  }
  return INITIAL_BLOG_POSTS;
};

export const saveBlogsToLocal = (blogs: BlogPost[]) => {
  try {
    localStorage.setItem(LOCAL_BLOGS_KEY, JSON.stringify(blogs));
  } catch (e) {
    console.error('Error saving blogs to localStorage', e);
  }
};

export const fetchAllBlogs = async (): Promise<BlogPost[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as BlogPost[];
      }
    } catch (e) {
      console.warn('Supabase blogs table not found or error, using fallback state', e);
    }
  }

  return getStoredBlogs();
};

export const saveBlogPost = async (blog: Partial<BlogPost>): Promise<BlogPost> => {
  const isEdit = Boolean(blog.id);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const payload: BlogPost = {
    id: blog.id || String(Date.now()),
    title: blog.title || '',
    desc: blog.desc || '',
    image: blog.image || '/images/hero_community_banner.png',
    meta: blog.meta || `${dateStr} • Admin • 0 Comments`,
    category: blog.category || 'मारवाड़',
    created_at: blog.created_at || now.toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      if (isEdit) {
        const { error } = await supabase.from('blogs').update(payload).eq('id', payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert(payload);
        if (error) throw error;
      }
    } catch (e) {
      console.warn('Failed saving blog to Supabase, saving locally', e);
    }
  }

  const currentLocal = getStoredBlogs();
  let updatedLocal: BlogPost[];

  if (isEdit) {
    updatedLocal = currentLocal.map((b) => (String(b.id) === String(payload.id) ? payload : b));
  } else {
    updatedLocal = [payload, ...currentLocal];
  }

  saveBlogsToLocal(updatedLocal);
  return payload;
};

export const deleteBlogPost = async (id: string | number): Promise<void> => {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('blogs').delete().eq('id', id);
    } catch (e) {
      console.warn('Failed deleting blog from Supabase', e);
    }
  }

  const currentLocal = getStoredBlogs();
  const filtered = currentLocal.filter((b) => String(b.id) !== String(id));
  saveBlogsToLocal(filtered);
};
