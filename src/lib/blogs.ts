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
    desc: 'राजस्थान प्रदेश माली-सैनी महासभा के प्रतिनिधिमंडल ने राजधानी में निदेशक जनगणना, राजस्थान को एक महत्वपूर्ण ज्ञापन सौंपा। इस दौरान जाति जनगणना में समाज की विभिन्न उपजातियों को ओर अलग-अलग श्रेणी में दर्ज करने के बजाय जाति कॉलम में केवल ‘सैनी/माली’ अंकित करने की पुरजोर मांग की गई।राजस्थान प्रदेश माली-सैनी महासभा के प्रदेश अध्यक्ष श्री छुट्टन लाल सैनी एवं उपाध्यक्ष बाबूलाल सैनी रजवास ने बताया कि देशभर में विभिन्न स्थानीय उपनामों के कारण समाज को सरकारी अभिलेखों में कई अलग-अलग नामों से चिन्हित किया जाता है। उन्होंने ऐतिहासिक संदर्भ देते हुए बताया कि वर्ष 1931 की जाति जनगणना में समाज की संयुक्त आबादी का एक बहुत बड़ा हिस्सा शामिल था, लेकिन तब जाति का आंतरिक बंटवारा कर दिया गया था, जिसे अब किसी भी सूरत में नहीं होने दिया जाएगा।महासभा के पदाधिकारियों ने कहा कि इस विसंगति को दूर करने के लिए पूरे प्रदेश में एक विशेष अभियान चलाकर समाज के लोगों को जागरूक किया जाएगा। इसके साथ ही केंद्र सरकार व जनगणना आयुक्त से व्यक्तिगत रूप से अनुरोध कर सभी उपजातियों को एक ही मुख्य नाम के अंतर्गत शामिल करवाया जाएगा।अखिल भारतवर्षीय स्तर पर भी दिल्ली में महारजिस्ट्रार एवं जनगणना आयुक्त के समक्ष यह मांग पहले ही उठाई जा चुकी है। इस अवसर पर प्रदेश अध्यक्ष छुट्टन लाल सैनी फुलवाले, उपाध्यक्ष बाबूलाल सैनी रजवास, कोषाध्यक्ष किशनलाल सैनी, यादराम सैनी,धर्म सैनी, पर्व सैनी मौजूद रहे।',
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
  },
  {
    id: 'jeevan-darshan-1',
    title: 'महात्मा ज्योतिराव फुले : शिक्षा, समानता और सामाजिक न्याय के महान क्रांतिदूत',
    desc: 'महात्मा ज्योतिराव फुले भारत के महान समाज सुधारक, विचारक, लेखक और दार्शनिक थे। उन्होंने अपना सम्पूर्ण जीवन समाज के शोषितों, महिलाओं एवं पिछड़ों के उत्थान तथा शिक्षा के प्रसार के लिए समर्पित कर दिया। 1873 में उन्होंने सत्यशोधक समाज की स्थापना की ताकि समाज में समानता एवं शिक्षा का अलख जगाया जा सके।',
    image: '/images/0.webp',
    meta: '15 Aug 2026 • Admin • 0 Comments',
    category: 'जीवन दर्शन एवं जन सेवा',
    created_at: new Date('2026-08-15').toISOString(),
  },
  {
    id: 'jeevan-darshan-2',
    title: 'संत शिरोमणि लिखमीदास जी महाराज : जीवन दर्शन एवं भक्ति संदेश',
    desc: 'संत लिखमीदास जी महाराज मारवाड़ क्षेत्र की परम पवित्र विभूति एवं लोकसंत थे। उन्होंने अपने भजनों और अनमोल उपदेशों के माध्यम से समाज में ईश्वर भक्ति, सामाजिक समरसता, दया एवं जीव सेवा का पावन सन्देश फैलाया।',
    image: '/images/1.webp',
    meta: '15 Aug 2026 • Admin • 0 Comments',
    category: 'जीवन दर्शन एवं जन सेवा',
    created_at: new Date('2026-08-15').toISOString(),
  },
  {
    id: 'jeevan-darshan-3',
    title: 'क्रांतिज्योति सावित्रीबाई फुले : भारत की प्रथम शिक्षिका और नारी जागरण की अग्रदूत',
    desc: 'क्रांतिज्योति सावित्रीबाई फुले भारत के पहले बालिका विद्यालय की प्रथम शिक्षिका और महिला अधिकारों की महान अग्रदूत थीं। उन्होंने शिक्षा के माध्यम से नारी सशक्तिकरण एवं सामाजिक विषमता उन्मूलन के लिए ऐतिहासिक संघर्ष किया।',
    image: '/images/2.webp',
    meta: '15 Aug 2026 • Admin • 0 Comments',
    category: 'जीवन दर्शन एवं जन सेवा',
    created_at: new Date('2026-08-15').toISOString(),
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

const isTableMissingError = (err: any): boolean => {
  if (!err) return false;
  const msg = (err.message || String(err)).toLowerCase();
  return (
    err.code === 'PGRST205' ||
    msg.includes('could not find the table') ||
    msg.includes('relation "public.blogs" does not exist') ||
    msg.includes('schema cache')
  );
};

export const fetchAllBlogs = async (): Promise<BlogPost[]> => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        if (data.length === 0) {
          // Auto-seed initial blog posts if Supabase blogs table is empty
          try {
            const { error: seedError } = await supabase.from('blogs').insert(INITIAL_BLOG_POSTS);
            if (!seedError) {
              return INITIAL_BLOG_POSTS;
            }
          } catch (sErr) {
            console.warn('Failed auto-seeding blogs to Supabase', sErr);
          }
          return INITIAL_BLOG_POSTS;
        }
        return data as BlogPost[];
      }
      if (error) {
        console.warn('Supabase fetch blogs notice/error:', error.message);
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
    id: blog.id ? String(blog.id) : String(Date.now()),
    title: blog.title || '',
    desc: blog.desc || '',
    image: blog.image || '/images/hero_community_banner.png',
    meta: blog.meta || `${dateStr} • Admin • 0 Comments`,
    category: blog.category || 'मारवाड़',
    created_at: blog.created_at || now.toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('blogs').upsert(payload, { onConflict: 'id' });
      if (error) {
        if (isTableMissingError(error)) {
          console.warn('Supabase blogs table missing, falling back to local storage. Run SQL migration in Supabase SQL Editor.', error);
        } else {
          console.error('Supabase save error details:', error);
          throw new Error(error.message || 'Supabase database error');
        }
      }
    } catch (e: any) {
      if (isTableMissingError(e)) {
        console.warn('Supabase blogs table missing, saving locally.', e);
      } else {
        console.error('Failed saving blog to Supabase:', e);
        throw new Error(e.message || 'Failed saving blog to Supabase database.');
      }
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
  const strId = String(id);
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', strId);
      if (error) {
        if (isTableMissingError(error)) {
          console.warn('Supabase blogs table missing, deleting locally.', error);
        } else {
          console.error('Supabase delete error details:', error);
          throw new Error(error.message || 'Supabase database delete error');
        }
      }
    } catch (e: any) {
      if (isTableMissingError(e)) {
        console.warn('Supabase blogs table missing, deleting locally.', e);
      } else {
        console.error('Failed deleting blog from Supabase:', e);
        throw new Error(e.message || 'Failed deleting blog from Supabase database.');
      }
    }
  }

  const currentLocal = getStoredBlogs();
  const filtered = currentLocal.filter((b) => String(b.id) !== String(strId));
  saveBlogsToLocal(filtered);
};
