export type VedaReplyLanguage = 'auto' | 'english' | 'malayalam' | 'manglish';
export type ResolvedVedaLanguage = Exclude<VedaReplyLanguage, 'auto'>;

const MANGLISH_CUES = new Set([
  'alle', 'aanu', 'aano', 'aayirikkum', 'cheyyam', 'cheyyu', 'cheyyum', 'cheythu', 'evide',
  'engane', 'entha', 'enthu', 'enthanu', 'enikku', 'ente', 'ethanu', 'ethokke', 'ivide',
  'kurich', 'mathi', 'nalla', 'nallathu', 'njan', 'njanum', 'ningal', 'ningalk',
  'ningalude', 'parayu', 'parayamo', 'paranja', 'paranjutharu', 'pinne', 'sugham',
  'sughamano', 'sukham', 'undo', 'venam', 'vere', 'ariyan', 'aaru',
]);

export function resolveVedaLanguage(
  message: string,
  preference: VedaReplyLanguage = 'auto',
): ResolvedVedaLanguage {
  if (preference !== 'auto') return preference;

  if (/\b(?:malayalam|malayalathil|malayalam-il)\b/i.test(message)) return 'malayalam';
  if (/\b(?:manglish|manglishil)\b/i.test(message)) return 'manglish';
  if (/[\u0D00-\u0D7F]/.test(message)) return 'malayalam';

  const words = message.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean);
  if (words.some((word) => MANGLISH_CUES.has(word))) return 'manglish';
  return 'english';
}

export interface LocalizedReply {
  text: string;
  pose: 'greeting' | 'coding' | 'engineering' | 'thinking' | 'happy' | 'celebrating' | 'explaining';
  navigationTarget?: string;
}

export function getLocalizedVedaReply(
  message: string,
  language: ResolvedVedaLanguage,
): LocalizedReply {
  const q = message.toLowerCase().replace(/[?!.,]/g, ' ').replace(/\s+/g, ' ').trim();
  const has = (...phrases: string[]) => phrases.some((phrase) => q.includes(phrase));
  const word = (...words: string[]) => words.some((value) => new RegExp(`(^|\\s)${value}($|\\s)`, 'i').test(q));
  const ml = language === 'malayalam';

  if (
    !has('how about you', 'what about you') &&
    has('tell me about yourself', 'tell me about you', 'about you', 'about yourself', 'who are you', 'who is eliz', 'what is your name', 'what is your role', 'introduce yourself')
  ) {
    return {
      pose: 'greeting',
      text: ml
        ? 'ഞാൻ ELIZ 😊 ഈ portfolio-യിൽ പ്രവർത്തിക്കുന്ന local guide ആണ്. വാസുദേവിന്റെ portfolio വിവരങ്ങൾ പറയാനും projects, skills, contact എന്നിവ കണ്ടെത്താനും സഹായിക്കും. General AI model ഇല്ലാത്തതിനാൽ എല്ലാത്തിനും അറിയാം എന്ന് പറയില്ല. Chat-ിന് paid AI API വേണ്ട; optional online sharing database storage ഉപയോഗിക്കാം. എന്നെക്കുറിച്ച് എന്താണ് അറിയേണ്ടത്?'
        : 'Njan ELIZ 😊 Ee portfolio-il local aayi pravarthikkunna guide aanu. Vasudev-inde portfolio details parayanum projects, skills, contact kandethanum help cheyyam. General AI model illathathukondu ellathinum answer ariyamennu parayilla; API charge-um illa. Enne kurichu entha ariyanullathu?',
    };
  }

  if (has('how are you', 'how are you doing', 'sughamano', 'sugham aano', 'sukhamano', 'how about you', 'what about you') || q === 'and you') {
    return {
      pose: 'happy',
      text: ml
        ? 'സുഖമായിരിക്കുന്നു, ചോദിച്ചതിന് നന്ദി 😊 നിങ്ങൾക്ക് സുഖമാണോ?'
        : 'Nannayirikkunnu, chodhichathinu thanks 😊 Ningalkko?',
    };
  }

  if (has('tell me a joke', 'make me laugh', 'got a joke')) {
    return {
      pose: 'happy',
      text: ml
        ? 'ഒരു റോബോട്ട് പെൻസിൽ എടുത്തത് എന്തിന്? സ്വന്തം conclusions വരയ്ക്കാൻ 🤖✏️ വേറൊരു തമാശ വേണോ, അതോ projects നോക്കാമോ?'
        : 'Robot pencil eduthathu enthinanu? Swantham conclusions draw cheyyan 🤖✏️ Iniyum joke venamo, atho projects nokkamo?',
    };
  }

  if (has('i feel sad', 'feeling down', 'rough day', 'bad day', 'stressed', 'വിഷമം', 'സങ്കടം', 'ടെൻഷൻ')) {
    return {
      pose: 'thinking',
      text: ml
        ? 'അങ്ങനെ തോന്നുന്നതിൽ വിഷമമുണ്ട്. പറയാൻ തോന്നിയാൽ എന്താണ് സംഭവിച്ചതെന്ന് പറയൂ; അല്ലെങ്കിൽ നമുക്ക് ലളിതമായ മറ്റെന്തെങ്കിലും സംസാരിക്കാം 💛'
        : 'Athu kettittu vishamam thonnunnu. Parayan thonnunnenkil entha sambhavichathennu parayu; allenkil namukku vere light aaya karyam samsarikkam 💛',
    };
  }

  if (has('you are so good', 'you re so good', 'you are amazing', 'you re amazing', 'you are awesome', 'you re awesome', 'you rock', 'nalla ai', 'nannayi paranju') ||
      (has('good') && has('you are', 'you re'))) {
    return {
      pose: 'celebrating',
      text: ml
        ? 'അയ്യോ, നന്ദി! അത് കേട്ടതിൽ സന്തോഷം 😊 ഇനി എന്തിനെക്കുറിച്ച് സംസാരിക്കാം?'
        : 'Aww, thanks! Athu kettathil santhosham 😊 Ini entha samsarikkam?',
    };
  }

  if (has('thank you', 'thanks', 'nanni', 'valare nanni', 'swagatham') || word('thanks', 'thank', 'nanni')) {
    return {
      pose: 'happy',
      text: ml ? 'സ്വാഗതം 😊 സന്തോഷത്തോടെ സഹായിക്കാം. ഇനി എന്താണ് അറിയേണ്ടത്?' : 'Swagatham 😊 Santhoshathode help cheyyam. Ini entha ariyanullathu?',
    };
  }

  if (/^(hi|hey|hello|yo|sugham|sughamano|namaskaram)(\s|$)/.test(q) || /^(ഹായ്|ഹലോ|നമസ്കാരം)/.test(q)) {
    return {
      pose: 'greeting',
      text: ml
        ? 'ഹായ്! 😊 സുഖമാണോ? വാസുദേവിന്റെ പ്രോജക്റ്റുകളെക്കുറിച്ചോ മറ്റെന്തിനെക്കുറിച്ചോ സംസാരിക്കാം. എന്താണ് അറിയേണ്ടത്?'
        : 'Hey! 😊 Sughamano? Vasudev-inde projectsine kurichum vere enthine kurichum samsarikkam. Entha ariyanullathu?',
    };
  }

  if (has('rover', 'first responder', 'jetson', 'nav2', 'autonomous', 'റോവർ', 'റോബോട്ട്', 'ഓട്ടോണമസ്')) {
    return {
      pose: 'coding',
      text: ml
        ? '🚗 **Autonomous First-Responder Rover**\n\nJetson Orin Nano, ROS 2/Nav2, computer vision, Drive-by-Wire എന്നിവ ചേർത്ത് emergency-response rover വികസിപ്പിക്കുന്ന പ്രോജക്റ്റാണ്. ഇതിന്റെ ഏത് ഭാഗത്തെക്കുറിച്ചാണ് കൂടുതൽ അറിയേണ്ടത്?'
        : '🚗 **Autonomous First-Responder Rover**\n\nJetson Orin Nano, ROS 2/Nav2, computer vision, Drive-by-Wire use cheythu emergency-response rover develop cheyyunna project aanu. Ethu part aanu kooduthal ariyanullathu?',
    };
  }

  if (has('equinox', 'baja', 'suspension', 'steering', 'ackermann', 'lotus shark', 'അബാജ', 'സസ്പെൻഷൻ')) {
    return {
      pose: 'engineering',
      text: ml
        ? '🏎️ **Team Equinox aBAJA SAE 2026**\n\nവാസുദേവ് Team Equinox-ന്റെ Suspension & Steering Development Team-ലാണ്. Lotus SHARK-ൽ suspension geometry, SOLIDWORKS-ൽ steering/Ackermann design, MSC Adams Car-ൽ multibody dynamics എന്നിവയാണ് portfolio-യിൽ രേഖപ്പെടുത്തിയിരിക്കുന്നത്. സ്ഥിരീകരിച്ച performance ഫലങ്ങൾ ഇതുവരെ ചേർത്തിട്ടില്ല.'
        : '🏎️ **Team Equinox aBAJA SAE 2026**\n\nVasudev Team Equinox-inde Suspension & Steering Development Team-il aanu. Lotus SHARK-il suspension geometry, SOLIDWORKS-il steering/Ackermann design, MSC Adams Car-il multibody dynamics aanu portfolio-il ullathu. Verified performance results ippol portfolio-il illa.',
    };
  }

  if (has('mediarm', 'robotic arm', 'manipulator', 'bts7960', 'ibt-2', 'റോബോട്ടിക് കൈ')) {
    return {
      pose: 'engineering',
      text: ml
        ? '🦾 **MediArm: 3-DOF Robotic Arm**\n\nESP32 control, IBT-2 motor drivers, MG996R/SG90 servos, Flask web interface, Vosk offline voice commands എന്നിവയുള്ള prototype ആണ്. Emergency kill switch-ും project page-ൽ വിവരിക്കുന്നു.'
        : '🦾 **MediArm: 3-DOF Robotic Arm**\n\nESP32 control, IBT-2 motor drivers, MG996R/SG90 servos, Flask web interface, Vosk offline voice commands ulla prototype aanu. Emergency kill switch-um project page-il describe cheyyunnundu.',
    };
  }

  if (has('silent guardian', 'scam', 'cybersecurity', 'cyber security', 'firewall', 'സൈബർ', 'സ്കാം')) {
    return {
      pose: 'explaining',
      text: ml
        ? '🛡️ **Silent Guardian**\n\nHack@Cooee 24-hour hackathon-ൽ വികസിപ്പിച്ച call-scam firewall prototype ആണ്. Local speech processing, suspicious-call scoring, sensitive-number redaction, evidence export എന്നിവയാണ് portfolio-യിൽ പറയുന്നത്.'
        : '🛡️ **Silent Guardian**\n\nHack@Cooee 24-hour hackathon-il develop cheytha call-scam firewall prototype aanu. Local speech processing, suspicious-call scoring, sensitive-number redaction, evidence export ennavayaanu portfolio-il ullathu.',
    };
  }

  if (has('vybe', 'travel discovery', 'tinkerspace', 'യാത്ര')) {
    return {
      pose: 'happy',
      text: ml
        ? '🧭 **VYBE** ഒരു swipe-based travel discovery web app prototype ആണ്. 2026 ഒക്ടോബർ 10–11-ന് TinkerSpace Calicut-ലെ hackathon sprint-ിലാണ് നിർമ്മിച്ചത്. Traveller, Operator, Admin എന്നീ roles ഉൾപ്പെടുത്താനായിരുന്നു പദ്ധതി.'
        : '🧭 **VYBE** oru swipe-based travel discovery web app prototype aanu. 2026 October 10–11-il TinkerSpace Calicut hackathon sprint-il aanu develop cheythathu. Traveller, Operator, Admin roles aanu plan cheythirunnathu.',
    };
  }

  if (has('credential', 'certificate', 'certification', 'cswa', 'nit calicut', 'സർട്ടിഫിക്കറ്റ്')) {
    return {
      pose: 'explaining',
      navigationTarget: 'credentials',
      text: ml
        ? '📜 Portfolio-യിൽ NIT Calicut Advanced Industrial Automation, Dassault Systèmes CSWA Mechanical Design, Open Robotics ROS 2 credentials എന്നിവ രേഖപ്പെടുത്തിയിട്ടുണ്ട്.'
        : '📜 Portfolio-il NIT Calicut Advanced Industrial Automation, Dassault Systèmes CSWA Mechanical Design, Open Robotics ROS 2 credentials aanu listed cheythittullathu.',
    };
  }

  if (has('skill', 'skills', 'tech stack', 'technology', 'technologies', 'firmware', 'സാങ്കേതിക', 'കഴിവുകൾ')) {
    return {
      pose: 'engineering',
      navigationTarget: 'skills',
      text: ml
        ? '⚙️ പ്രധാന മേഖലകൾ: Robotics (ROS 2, Nav2), CAD (SOLIDWORKS, Lotus SHARK), Embedded Systems (ESP32, STM32, FreeRTOS), CAN bus, Python/C++ എന്നിവയാണ്.'
        : '⚙️ Main areas: Robotics (ROS 2, Nav2), CAD (SOLIDWORKS, Lotus SHARK), Embedded Systems (ESP32, STM32, FreeRTOS), CAN bus, Python/C++ aanu.',
    };
  }

  if (has('college', 'education', 'degree', 'study', 'saintgits', 'ktu', 'കലാലയം', 'പഠനം', 'എവിടെ പഠിക്കുന്നു')) {
    return {
      pose: 'explaining',
      text: ml
        ? '🎓 വാസുദേവ് Saintgits College of Engineering-ൽ Robotics & Automation Engineering B.Tech വിദ്യാർത്ഥിയാണ്. കോളേജ് APJ KTU-യുമായി അഫിലിയേറ്റ് ചെയ്തിരിക്കുന്നു; അദ്ദേഹം Calicut, Kerala-യിൽ നിന്നാണ്.'
        : '🎓 Vasudev Saintgits College of Engineering-il Robotics & Automation Engineering B.Tech student aanu. College APJ KTU-yumaayi affiliated aanu; Calicut, Kerala aanu home base.',
    };
  }

  if (has('contact', 'email', 'phone', 'linkedin', 'github', 'ബന്ധപ്പെട')) {
    return {
      pose: 'happy',
      navigationTarget: 'contact',
      text: ml
        ? '📬 വാസുദേവിനെ email, LinkedIn, GitHub വഴി ബന്ധപ്പെടാം. Contact section-ൽ വിവരങ്ങൾ കാണാം.'
        : '📬 Vasudev-ne email, LinkedIn, GitHub vazhi contact cheyyam. Contact section-il details undu.',
    };
  }

  if (has('who is', 'about', 'vasudev', 'thecrazydabi', 'ആരാണ്', 'വാസുദേവ്')) {
    return {
      pose: 'explaining',
      navigationTarget: 'about',
      text: ml
        ? 'വാസുദേവ് Saras K M, Saintgits College of Engineering-ൽ Robotics & Automation Engineering പഠിക്കുന്ന വിദ്യാർത്ഥിയാണ്. Robotics, vehicle dynamics, embedded systems, CAD എന്നിവയിലാണ് portfolio ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്നത്.'
        : 'Vasudev Saras K M, Saintgits College of Engineering-il Robotics & Automation Engineering padikkunna student aanu. Robotics, vehicle dynamics, embedded systems, CAD ennivayaanu portfolio focus.',
    };
  }

  if (has('project', 'projects', 'build', 'പ്രോജക്റ്റ്', 'പ്രോജക്ട്') || word('projects?')) {
    return {
      pose: 'coding',
      navigationTarget: 'projects',
      text: ml
        ? '🚀 Portfolio-യിലെ featured projects: Autonomous First-Responder Rover, Equinox aBAJA, MediArm, Silent Guardian, VYBE. ഏത് project ആണ് വിശദമായി അറിയേണ്ടത്?'
        : '🚀 Portfolio-il featured projects: Autonomous First-Responder Rover, Equinox aBAJA, MediArm, Silent Guardian, VYBE. Ethu project aanu detail aayi ariyanullathu?',
    };
  }

  const quotedMessage = message.length > 90 ? `${message.slice(0, 87).trimEnd()}…` : message;
  return {
    pose: 'thinking',
    text: ml
      ? `നിങ്ങൾ ചോദിച്ചത് “${quotedMessage}” എന്നതിനെക്കുറിച്ചാണ് 😊 ഞാൻ ബ്രൗസറിൽ തന്നെ പ്രവർത്തിക്കുന്ന local guide ആണ്; എന്റെ മറുപടികൾ portfolio വിവരങ്ങളും കുറച്ച് സംഭാഷണ cues-ഉം ആശ്രയിച്ചാണ്. കുറച്ച് കൂടി context തരാമോ? അപ്പോൾ സഹായിക്കാൻ ശ്രമിക്കാം.`
      : `“${quotedMessage}” alle 😊 Njan local guide aanu; portfolio details-um kurachu conversation cues-um aanu use cheyyunnathu. Kurachu context koodi parayamo? Appol nannayi help cheyyan nokkam.`,
  };
}
