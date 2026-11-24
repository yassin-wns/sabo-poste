import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LangCode, MultilingualList, MultilingualText } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'sabo_poste_lang';
  private currentLangSubject = new BehaviorSubject<LangCode>(this.getInitialLang());
  public currentLang$ = this.currentLangSubject.asObservable();

  private translations: Record<LangCode, Record<string, string>> = {
    fr: {
      // Header & Navigation (Figure 4)
      header_title: "Plateforme d'information - Bureau de Poste",
      header_subtitle: "Bureau de Poste de Sidi Ali Ben Aoun (9120)",
      nav_home: "Accueil",
      nav_services: "Services",
      nav_horaires: "Horaires",
      nav_d17: "D17",
      nav_contact: "Contact",
      nav_admin: "Admin",
      nav_logout: "Se Déconnecter",

      // Language Buttons (Figure 11)
      lang_fr: "FRANCAIS",
      lang_ar: "العربية",
      lang_en: "ENGLAIS",

      // Status
      status_open: "Ouvert actuellement",
      status_closed: "Fermé actuellement",
      status_half_day: "Séance du Samedi (08h-12h)",

      // ACCUEIL (Figure 4)
      home_welcome_title: "Bienvenue au Bureau de Poste",
      home_welcome_subtitle: "Cette plateforme web a été développée dans le cadre d'un stage de perfectionnement au sein d'un bureau de poste. Elle vise à informer les citoyens sur les services disponibles, les horaires et les procédures administratives.",
      
      home_function_title: "Fonctionnement du Bureau de Poste",
      home_function_desc: "Le bureau de poste assure la gestion du courrier, des colis et des services financiers dans un environnement organisé et sécurisé. Il offre également un accompagnement client personnalisé.",
      home_func_1: "Tri du courrier entrant",
      home_func_2: "Orientation du courrier et des colis",
      home_func_3: "Gestion des services financiers",
      home_func_4: "Accueil et assistance des clients",
      home_func_5: "Information sur les services et procédures",

      home_services_title: "Nos Services",
      home_serv_postal_title: "Services Postaux",
      home_serv_postal_desc: "Envoi et réception du courrier ordinaire et express, suivi en temps réel.",
      home_serv_finance_title: "Services Financiers",
      home_serv_finance_desc: "Mandats électroniques, paiements et services monétiques sécurisés.",
      home_serv_assist_title: "Assistance et Informations",
      home_serv_assist_desc: "Conseils personnalisés pour toutes vos démarches administratives et financières.",

      home_obj_title: "Objectif de la plateforme",
      home_obj_intro: "Cette plateforme permet aux citoyens de :",
      home_obj_1: "Comprendre les services disponibles",
      home_obj_2: "Identifier le service adapté à leurs besoins",
      home_obj_3: "Connaître les documents nécessaires",
      home_obj_4: "Réduire le temps d'attente au bureau",
      home_obj_5: "Accéder facilement aux horaires et coordonnées",

      // SERVICES (Figure 5)
      services_main_title: "Découvrez nos Services",
      services_main_subtitle: "Le Bureau de Poste offre une large gamme de services postaux et financiers pour les particuliers et les organismes.",
      services_postaux_heading: "Services Postaux",
      services_financiers_heading: "Services Financiers",
      services_search_placeholder: "Rechercher un service...",
      services_view_details: "Consulter la démarche",
      services_modal_close: "Fermer",
      services_modal_reqs: "Pièces & Documents requis :",
      services_modal_steps: "Étapes au guichet :",
      services_modal_delay: "Délai moyen :",

      // HORAIRES (Figure 6)
      horaires_main_title: "Nos Horaires d'Ouverture",
      horaires_main_subtitle: "Consultez nos horaires pour planifier vos visites au Bureau de Poste.",
      horaires_weekly_title: "Horaires Hebdomadaires",
      horaires_col_day: "Jour",
      horaires_col_morning: "Matin",
      horaires_col_afternoon: "Après-midi",
      horaires_mon: "Lundi",
      horaires_tue: "Mardi",
      horaires_wed: "Mercredi",
      horaires_thu: "Jeudi",
      horaires_fri: "Vendredi",
      horaires_sat: "Samedi",
      horaires_sun: "Dimanche",
      horaires_closed: "Fermé",

      // D17 (Figure 7)
      d17_title: "Application D17",
      d17_paragraph: "L'application D17 de la Poste Tunisienne offre une gamme complète de services financiers et de gestion pour simplifier vos transactions quotidiennes. Grâce à D17, vous pouvez effectuer des paiements de factures directement depuis votre téléphone, transférer de l'argent à d'autres comptes PostFinance, suivre l'historique de vos transactions, et gérer vos comptes en toute sécurité. L'application propose également des services de dépôt et de retrait, la consultation des soldes en temps réel, ainsi que la planification et le suivi de vos virements récurrents. En outre, D17 permet d'accéder à des services supplémentaires tels que la localisation des bureaux de poste, la notification instantanée des mouvements de votre compte, et la possibilité de bloquer ou débloquer vos cartes bancaires en cas de besoin. L'ensemble de ces fonctionnalités est sécurisé par des protocoles de cryptage avancés, garantissant que vos informations financières restent confidentielles et protégées à tout moment.",
      d17_preview_title: "Aperçu de l'application",
      d17_cards_title: "Les cartes compatibles avec D17",
      d17_cards_desc: "L'application D17 est compatible avec plusieurs cartes proposées par la Poste Tunisienne. Parmi celles-ci, la carte e-DINAR permet d'effectuer des paiements électroniques, des transferts d'argent et le règlement des factures. La carte e-DINAR PRO est destinée aux professionnels et aux entreprises pour la gestion financière et les paiements professionnels. La carte e-DINAR SMART offre des fonctionnalités avancées et une sécurité renforcée. DigiCard est utilisée principalement pour les paiements en ligne sécurisés. MOBI TAMKEEN est destinée aux bénéficiaires des aides sociales. En plus des cartes, l'application D17 permet d'accéder à plusieurs services comme Mobilcred, Mobitasdid, Mobitamweel et le paiement chez les partenaires commerciaux tels que Forever, Farmasi et autres.",
      d17_jeune_title: "Carte e-DINAR Jeune",
      d17_jeune_desc: "La carte e-DINAR Jeune est une carte électronique proposée par la Poste Tunisienne, spécialement destinée aux jeunes et aux étudiants. Elle permet d'effectuer des paiements électroniques en toute sécurité, notamment pour les achats en ligne, le paiement des factures (eau, électricité, télécommunications) et les paiements chez les commerçants partenaires. Grâce à l'application D17, le titulaire de la carte peut consulter son solde en temps réel, suivre l'historique des transactions et recevoir des notifications instantanées après chaque opération. La carte e-DINAR Jeune permet également d'effectuer des transferts d'argent et de gérer son budget de manière simple et sécurisée, tout en offrant une solution adaptée aux besoins financiers des jeunes.",

      // CONTACT (Figure 8)
      contact_main_title: "Contactez-Nous",
      contact_main_subtitle: "Envoyez-nous un message ou consultez nos coordonnées pour toute information.",
      contact_form_title: "Formulaire de Contact",
      contact_field_name: "Votre nom / اسمك / Your Name",
      contact_field_email: "Votre email / بريدك الإلكتروني / Your Email",
      contact_field_subject: "Sujet / الموضوع / Subject",
      contact_field_message: "Votre message / رسالتك / Your Message",
      contact_btn_send: "Envoyer",
      contact_success: "Votre message a été envoyé avec succès !",
      contact_error: "Veuillez remplir tous les champs obligatoires.",

      // ADMIN (Figure 9 & Figure 10)
      admin_login_title: "Connexion Admin",
      admin_login_username: "Nom d'utilisateur / اسم المستخدم / Username",
      admin_login_password: "Mot de passe / كلمة المرور / Password",
      admin_login_btn: "Se Connecter",
      admin_login_error: "Nom d'utilisateur ou mot de passe incorrect.",
      admin_dashboard_title: "Admin Dashboard",
      admin_messages_title: "Messages reçus",
      admin_col_id: "ID",
      admin_col_nom: "Nom",
      admin_col_email: "Email",
      admin_col_sujet: "Sujet",
      admin_col_message: "Message",
      admin_col_date: "Date",
      admin_col_actions: "Actions",
      admin_mark_replied: "Répondu",
      admin_delete: "Supprimer",

      // Footer
      footer_copy: "© 2026 - Poste De Sidi Ali Ben Aoun",
      footer_project: "Projet réalisé dans le cadre d'un stage de perfectionnement",
      footer_author: "Créé par Yassin Wannassi"
    },

    ar: {
      // Header & Navigation (Figure 4)
      header_title: "منصة الإعلام - مكتب البريد",
      header_subtitle: "مكتب بريد سيدي علي بن عون (9120)",
      nav_home: "الرئيسية",
      nav_services: "الخدمات",
      nav_horaires: "المواعيد",
      nav_d17: "D17",
      nav_contact: "اتصل بنا",
      nav_admin: "الإدارة",
      nav_logout: "تسجيل الخروج",

      // Language Buttons (Figure 11)
      lang_fr: "FRANCAIS",
      lang_ar: "العربية",
      lang_en: "ENGLAIS",

      // Status
      status_open: "مفتوح حالياً للعموم",
      status_closed: "مغلق حالياً",
      status_half_day: "حصة السبت الصباحية (08:00 - 12:00)",

      // ACCUEIL (Figure 4)
      home_welcome_title: "مرحباً بكم في مكتب البريد",
      home_welcome_subtitle: "تم تطوير هذه المنصة في إطار تربص تحسين الكفاءة بمكتب البريد. تهدف إلى إعلام المواطنين بالخدمات المتوفرة والمواعيد والإجراءات الإدارية.",

      home_function_title: "سير العمل بمكتب البريد",
      home_function_desc: "يؤمن مكتب البريد معالجة المراسلات والطرود والخدمات المالية في بيئة منظمة وآمنة، مع تقديم مرافقة شخصية للمواطنين.",
      home_func_1: "فرز البريد الوارد",
      home_func_2: "توجيه الرسائل والطرود",
      home_func_3: "التصرف في العمليات المالية",
      home_func_4: "استقبال وإرشاد الحرفاء",
      home_func_5: "الإعلام بالخدمات والإجراءات",

      home_services_title: "خدماتنا",
      home_serv_postal_title: "الخدمات البريدية",
      home_serv_postal_desc: "إرسال واستقبال البريد العادي والسريع مع إمكانية التتبع الفوري.",
      home_serv_finance_title: "الخدمات المالية",
      home_serv_finance_desc: "الحوالات الإلكترونية، خلاص الفواتير والخدمات النقدية المؤمنة.",
      home_serv_assist_title: "المساعدة والإرشاد",
      home_serv_assist_desc: "إرشادات شخصية لتسهيل كافة إجراءاتكم الإدارية والمالية.",

      home_obj_title: "أهداف المنصة",
      home_obj_intro: "تتيح هذه المنصة للمواطنين :",
      home_obj_1: "فهم الخدمات المتوفرة بسهولة",
      home_obj_2: "اختيار الخدمة المناسبة لحاجياتهم",
      home_obj_3: "معرفة الوثائق والمستندات المطلوبة مسبقاً",
      home_obj_4: "تقليص مدة الانتظار داخل المكتب",
      home_obj_5: "الوصول السريع إلى جداول التوقيت وبيانات الاتصال",

      // SERVICES (Figure 5)
      services_main_title: "اكتشفوا خدماتنا",
      services_main_subtitle: "يقدم مكتب البريد باقة واسعة من الخدمات البريدية والمالية الموجهة للمواطنين والمؤسسات.",
      services_postaux_heading: "الخدمات البريدية",
      services_financiers_heading: "الخدمات المالية",
      services_search_placeholder: "ابحث عن خدمة بريدية أو مالية...",
      services_view_details: "تفاصيل الإجراء",
      services_modal_close: "إغلاق",
      services_modal_reqs: "الوثائق المطلوبة :",
      services_modal_steps: "المراحل لدى الشباك :",
      services_modal_delay: "المدة التقديرية :",

      // HORAIRES (Figure 6)
      horaires_main_title: "مواعيد العمل",
      horaires_main_subtitle: "اطلعوا على أوقات العمل لبرمجة زيارتكم لمكتب البريد وتفادي الانتظار.",
      horaires_weekly_title: "أوقات العمل الأسبوعية",
      horaires_col_day: "اليوم",
      horaires_col_morning: "الصباح",
      horaires_col_afternoon: "بعد الظهر",
      horaires_mon: "الاثنين",
      horaires_tue: "الثلاثاء",
      horaires_wed: "الأربعاء",
      horaires_thu: "الخميس",
      horaires_fri: "الجمعة",
      horaires_sat: "السبت",
      horaires_sun: "الأحد",
      horaires_closed: "مغلق",

      // D17 (Figure 7)
      d17_title: "تطبيق D17",
      d17_paragraph: "يوفر تطبيق D17 للبريد التونسي مجموعة متكاملة من الخدمات المالية والإدارية لتسهيل معاملاتكم اليومية. بفضل D17، يمكنك خلاص الفواتير مباشرة من هاتفك الجوال، تحويل الأموال إلى حسابات أخرى، متابعة كشف العمليات، وإدارة حساباتك بكل أمان. يتيح التطبيق كذلك خدمات الإيداع والسحب، ومتابعة الرصيد في الحين، وبرمجة التحويلات الدورية. كما يمكنك تحديد مواقع مكاتب البريد، وتلقي إشعارات فورية بكل معاملة، مع إمكانية تجميد أو تفعيل بطاقاتك البنكية والبريدية. كافة هذه الميزات محمية بأنظمة تشفير متطورة تضمن سرية بياناتك المالية.",
      d17_preview_title: "لمحة عن التطبيق",
      d17_cards_title: "البطاقات المتوافقة مع D17",
      d17_cards_desc: "يتوافق تطبيق D17 مع العديد من بطاقات البريد التونسي، مثل بطاقة دينار إلكتروني سمارت لخلاص الفواتير والمشتريات، وبطاقة دينار للمحترفين (PRO)، وبطاقة ديجيكارد للدفع الآمن عبر الإنترنت، وبطاقة تمكين للمنتفعين بالمساعدات الاجتماعية. إضافة إلى ذلك، يتيح التطبيق النفاذ إلى خدمات موبيلكريد، وموبي تسديد، وموبي تمويل، والشراء لدى الشركاء التجاريين مثل فورايفر وفارماسي وغيرها.",
      d17_jeune_title: "بطاقة دينار الشباب (e-DINAR Jeune)",
      d17_jeune_desc: "تعتبر بطاقة دينار الشباب بطاقة إلكترونية مخصصة للتلاميذ والطلبة، تتيح خلاص المعاليم عن بعد بكل أمان، وخاصة التسجيل الجامعي على موقع inscription.tn، وتلقي المنح المدرسية والجامعية، وخلاص فواتير الكهرباء والماء والاتصالات. عبر تطبيق D17، يمكن لحامل البطاقة متابعة رصيده فورياً واستلام إشعار بعد كل عملية وإدارة ميزانيته بكل سهولة.",

      // CONTACT (Figure 8)
      contact_main_title: "اتصل بنا",
      contact_main_subtitle: "أرسل لنا رسالة أو اطلع على بيانات الاتصال للاستفسار والتوجيه.",
      contact_form_title: "استمارة الاتصال",
      contact_field_name: "Votre nom / اسمك / Your Name",
      contact_field_email: "Votre email / بريدك الإلكتروني / Your Email",
      contact_field_subject: "Sujet / الموضوع / Subject",
      contact_field_message: "Votre message / رسالتك / Your Message",
      contact_btn_send: "إرسال",
      contact_success: "تم إرسال رسالتكم بنجاح!",
      contact_error: "يرجى تعبئة كافة الخانات المطلوبة.",

      // ADMIN (Figure 9 & Figure 10)
      admin_login_title: "دخول الإدارة",
      admin_login_username: "Nom d'utilisateur / اسم المستخدم / Username",
      admin_login_password: "Mot de passe / كلمة المرور / Password",
      admin_login_btn: "دخول",
      admin_login_error: "اسم المستخدم أو كلمة المرور غير صحيحة.",
      admin_dashboard_title: "لوحة التحكم - Admin Dashboard",
      admin_messages_title: "الرسائل الواردة",
      admin_col_id: "المعرف",
      admin_col_nom: "الاسم",
      admin_col_email: "البريد الإلكتروني",
      admin_col_sujet: "الموضوع",
      admin_col_message: "الرسالة",
      admin_col_date: "التاريخ",
      admin_col_actions: "الإجراءات",
      admin_mark_replied: "تمت الإجابة",
      admin_delete: "حذف",

      // Footer
      footer_copy: "© 2026 - مكتب بريد سيدي علي بن عون",
      footer_project: "مشروع منجز في إطار تربص تحسين الكفاءة",
      footer_author: "إعداد : ياسين وناسي"
    },

    en: {
      // Header & Navigation (Figure 4)
      header_title: "Information Platform - Post Office",
      header_subtitle: "Sidi Ali Ben Aoun Post Office (9120)",
      nav_home: "Home",
      nav_services: "Services",
      nav_horaires: "Hours",
      nav_d17: "D17",
      nav_contact: "Contact",
      nav_admin: "Admin",
      nav_logout: "Logout",

      // Language Buttons (Figure 11)
      lang_fr: "FRANCAIS",
      lang_ar: "العربية",
      lang_en: "ENGLAIS",

      // Status
      status_open: "Currently Open",
      status_closed: "Currently Closed",
      status_half_day: "Saturday Shift (08:00 - 12:00)",

      // ACCUEIL (Figure 4)
      home_welcome_title: "Welcome to the Post Office",
      home_welcome_subtitle: "This web platform was developed as part of an advanced internship at the post office. It aims to inform citizens about available services, working hours, and administrative procedures.",

      home_function_title: "Post Office Operations",
      home_function_desc: "The post office manages mail, parcels, and financial services in an organized and secure environment, providing personalized customer support.",
      home_func_1: "Inward mail sorting",
      home_func_2: "Mail and parcel routing",
      home_func_3: "Financial services management",
      home_func_4: "Customer reception and guidance",
      home_func_5: "Information on services and procedures",

      home_services_title: "Our Services",
      home_serv_postal_title: "Postal Services",
      home_serv_postal_desc: "Sending and receiving regular and express mail with real-time tracking.",
      home_serv_finance_title: "Financial Services",
      home_serv_finance_desc: "Electronic money orders, bill payments, and secure financial card services.",
      home_serv_assist_title: "Assistance & Information",
      home_serv_assist_desc: "Personalized advice for all your administrative and financial procedures.",

      home_obj_title: "Platform Objectives",
      home_obj_intro: "This platform enables citizens to:",
      home_obj_1: "Understand all available services easily",
      home_obj_2: "Identify the service suited to their needs",
      home_obj_3: "Know required identification papers beforehand",
      home_obj_4: "Reduce waiting times at the counter",
      home_obj_5: "Access schedules and contact information quickly",

      // SERVICES (Figure 5)
      services_main_title: "Discover our Services",
      services_main_subtitle: "The Post Office offers a wide range of postal and financial services for individuals and organizations.",
      services_postaux_heading: "Postal Services",
      services_financiers_heading: "Financial Services",
      services_search_placeholder: "Search for a service...",
      services_view_details: "View Procedure",
      services_modal_close: "Close",
      services_modal_reqs: "Required Documents:",
      services_modal_steps: "Counter Steps:",
      services_modal_delay: "Average Delay:",

      // HORAIRES (Figure 6)
      horaires_main_title: "Opening Hours",
      horaires_main_subtitle: "Check our hours to plan your post office visits conveniently.",
      horaires_weekly_title: "Weekly Operating Hours",
      horaires_col_day: "Day",
      horaires_col_morning: "Morning",
      horaires_col_afternoon: "Afternoon",
      horaires_mon: "Monday",
      horaires_tue: "Tuesday",
      horaires_wed: "Wednesday",
      horaires_thu: "Thursday",
      horaires_fri: "Friday",
      horaires_sat: "Saturday",
      horaires_sun: "Sunday",
      horaires_closed: "Closed",

      // D17 (Figure 7)
      d17_title: "D17 Mobile Application",
      d17_paragraph: "The D17 application from the Tunisian Post offers a complete range of financial and account management services to simplify your daily transactions. With D17, you can pay utility bills directly from your phone, transfer money to other PostFinance accounts, check transaction history, and manage accounts securely. The app also features ATM deposits and withdrawals, real-time balance checks, and recurring transfer scheduling. All features are secured with advanced encryption protocols ensuring your data remains protected.",
      d17_preview_title: "Application Preview",
      d17_cards_title: "Cards Compatible with D17",
      d17_cards_desc: "D17 works seamlessly with multiple postal cards: e-DINAR SMART for daily payments, e-DINAR PRO for business management, DigiCard for safe online shopping, and MOBI TAMKEEN for social grants. The app also links to Mobilcred, Mobitasdid, Mobitamweel, and commercial merchants like Forever and Farmasi.",
      d17_jeune_title: "e-DINAR Youth Card (Students)",
      d17_jeune_desc: "The e-DINAR Youth card is designed specifically for pupils and university students. It allows secure electronic payments for online university enrollment on inscription.tn, scholarship reception, utility bills, and merchant purchases. Students can monitor their balance in real time and manage their budget with ease.",

      // CONTACT (Figure 8)
      contact_main_title: "Contact Us",
      contact_main_subtitle: "Send us a message or find our contact information for any inquiries.",
      contact_form_title: "Contact Form",
      contact_field_name: "Votre nom / اسمك / Your Name",
      contact_field_email: "Votre email / بريدك الإلكتروني / Your Email",
      contact_field_subject: "Sujet / الموضوع / Subject",
      contact_field_message: "Votre message / رسالتك / Your Message",
      contact_btn_send: "Send",
      contact_success: "Your message has been sent successfully!",
      contact_error: "Please fill in all required fields.",

      // ADMIN (Figure 9 & Figure 10)
      admin_login_title: "Admin Login",
      admin_login_username: "Nom d'utilisateur / اسم المستخدم / Username",
      admin_login_password: "Mot de passe / كلمة المرور / Password",
      admin_login_btn: "Login",
      admin_login_error: "Invalid username or password.",
      admin_dashboard_title: "Admin Dashboard",
      admin_messages_title: "Received Messages",
      admin_col_id: "ID",
      admin_col_nom: "Name",
      admin_col_email: "Email",
      admin_col_sujet: "Subject",
      admin_col_message: "Message",
      admin_col_date: "Date",
      admin_col_actions: "Actions",
      admin_mark_replied: "Replied",
      admin_delete: "Delete",

      // Footer
      footer_copy: "© 2026 - Sidi Ali Ben Aoun Post Office",
      footer_project: "Project developed as part of an advanced internship",
      footer_author: "Created by Yassin Wannassi"
    }
  };

  constructor() {
    this.applyLanguage(this.currentLangSubject.value);
  }

  private getInitialLang(): LangCode {
    const saved = localStorage.getItem(this.STORAGE_KEY) as LangCode;
    if (saved && (saved === 'fr' || saved === 'ar' || saved === 'en')) {
      return saved;
    }
    return 'fr';
  }

  public get currentLang(): LangCode {
    return this.currentLangSubject.value;
  }

  public setLanguage(lang: LangCode): void {
    this.currentLangSubject.next(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.applyLanguage(lang);
  }

  private applyLanguage(lang: LangCode): void {
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    if (isRtl) {
      document.body.classList.add('rtl-layout');
      document.body.classList.remove('ltr-layout');
    } else {
      document.body.classList.add('ltr-layout');
      document.body.classList.remove('rtl-layout');
    }
  }

  public t(key: string): string {
    const lang = this.currentLang;
    const table = this.translations[lang] || this.translations.fr;
    return table[key] || this.translations.fr[key] || key;
  }

  public getLocalizedText(obj: MultilingualText | undefined | null): string {
    if (!obj) return '';
    const lang = this.currentLang;
    if (obj[lang]) return obj[lang];
    if (obj.fr) return obj.fr;
    if (obj.ar) return obj.ar;
    if (obj.en) return obj.en;
    return '';
  }

  public getLocalizedList(obj: MultilingualList | undefined | null): string[] {
    if (!obj) return [];
    const lang = this.currentLang;
    if (obj[lang] && obj[lang].length > 0) return obj[lang];
    if (obj.fr && obj.fr.length > 0) return obj.fr;
    if (obj.ar && obj.ar.length > 0) return obj.ar;
    if (obj.en && obj.en.length > 0) return obj.en;
    return [];
  }
}
