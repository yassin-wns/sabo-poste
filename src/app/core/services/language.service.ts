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
      // General & Brand
      brand_title: 'SABO POSTE 2.0',
      brand_subtitle: 'Bureau de Poste Sidi Ali Ben Aoun (9120)',
      brand_slogan: "L'information postale & financière claire et accessible",
      academic_badge: 'Projet Universitaire — Stage de Perfectionnement 2026',
      
      // Nav
      nav_home: 'Accueil',
      nav_services: 'Nos Services',
      nav_horaires: 'Horaires & Agence',
      nav_d17: 'Espace D17',
      nav_faq: 'Foire Aux Questions',
      nav_news: 'Actualités',
      nav_contact: 'Contactez-nous',
      nav_admin: 'Administration',
      nav_login: 'Connexion Admin',
      nav_logout: 'Déconnexion',

      // Hero
      hero_badge: 'Plateforme Officielle d’Information Postale',
      hero_title: 'Bienvenue au Bureau de Poste de Sidi Ali Ben Aoun',
      hero_subtitle: 'Consultez les prestations postales, maîtrisez l’application D17, découvrez les cartes e-DINAR et planifiez vos visites sans attente inutile.',
      hero_btn_services: 'Explorer nos Services',
      hero_btn_d17: 'Découvrir D17',
      hero_btn_hours: 'Voir les Horaires',
      hero_search_placeholder: 'Rechercher un service (D17, e-DINAR, Mandat, Factures, Colis...)',

      // Agency Live Status
      status_open: 'Actuellement Ouvert',
      status_closed: 'Actuellement Fermé',
      status_half_day: 'Séance Samedi (Matin)',
      status_today_hours: "Horaires d'aujourd'hui :",

      // Stats
      stat_services: 'Prestations Référencées',
      stat_counters: 'Guichets Opérationnels',
      stat_satisfaction: 'Orientation Facilitée',
      stat_d17_access: 'Assistance D17 24/7',

      // Categories
      categories_title: 'Domaines d’Activité',
      categories_subtitle: 'Accédez rapidement aux informations essentielles selon vos besoins',
      cat_all: 'Tous les Services',

      // Services page
      services_title: 'Nos Prestations Postales & Financières',
      services_subtitle: 'Guides complets, pièces requises, démarches au guichet et délais de traitement',
      service_requirements: 'Pièces & Documents Requis :',
      service_steps: 'Étapes de la Procédure :',
      service_delivery: 'Délai moyen :',
      service_category: 'Catégorie :',
      service_btn_details: 'Voir la Démarche Complète',
      service_modal_close: 'Fermer',
      service_popular: 'Très Demandé',
      service_featured: 'Prioritaire',

      // D17
      d17_hero_title: 'Espace D17 — DIGI POST BANK',
      d17_hero_subtitle: 'L’application mobile de la Poste Tunisienne pour vos paiements, transferts et la gestion de vos cartes en temps réel.',
      d17_why_title: 'Pourquoi utiliser D17 ?',
      d17_why_1_title: 'Zéro Déplacement',
      d17_why_1_desc: 'Payez vos factures STEG, SONEDE et télécoms depuis votre domicile à toute heure.',
      d17_why_2_title: 'Transferts Instantanés',
      d17_why_2_desc: 'Envoyez de l’argent immédiatement à vos proches par mandat minute ou de carte à carte.',
      d17_why_3_title: 'Sécurité Maximale',
      d17_why_3_desc: 'Transactions protégées par code PIN secret et validation par SMS.',
      d17_cards_title: 'Cartes Compatibles avec D17',
      d17_cards_subtitle: 'Associez votre carte à l’application pour profiter de tous les services',
      d17_student_focus_title: 'Focus Étudiants : Carte e-DINAR Jeune',
      d17_student_focus_desc: 'La carte indispensable pour les élèves et étudiants de Sidi Ali Ben Aoun : bourses, prêts universitaires et inscriptions en ligne.',
      d17_guides_title: 'Guides Pratiques D17',

      // Horaires & Agency
      horaires_title: 'Horaires d’Ouverture & Coordonnées',
      horaires_subtitle: 'Bureau de Poste de Sidi Ali Ben Aoun — Code Postal 9120',
      horaires_table_day: 'Jour',
      horaires_table_morning: 'Séance du Matin',
      horaires_table_afternoon: 'Séance de l’Après-Midi',
      horaires_table_status: 'État',
      horaires_mon: 'Lundi',
      horaires_tue: 'Mardi',
      horaires_wed: 'Mercredi',
      horaires_thu: 'Jeudi',
      horaires_fri: 'Vendredi',
      horaires_sat: 'Samedi',
      horaires_sun: 'Dimanche',
      horaires_closed_text: 'Fermé',
      agency_address_label: 'Adresse :',
      agency_phone_label: 'Téléphone :',
      agency_email_label: 'Courriel :',
      agency_counters_label: 'Guichets en service :',
      agency_supervisor_label: 'Responsable :',
      agency_features_title: 'Prestations Assurées sur Place :',

      // Contact
      contact_title: 'Contactez le Bureau de Poste',
      contact_subtitle: 'Une question sur un service, une réclamation ou une demande d’orientation ? Écrivez-nous.',
      form_name: 'Nom & Prénom',
      form_email: 'Adresse E-mail',
      form_phone: 'Numéro de Téléphone (Optionnel)',
      form_category: 'Service Concerné',
      form_subject: 'Objet du Message',
      form_message: 'Votre Message / Question',
      form_submit: 'Envoyer ma Demande',
      form_sending: 'Envoi en cours...',
      form_success: 'Votre message a été enregistré avec succès ! Nos agents vous répondront dans les plus brefs délais.',
      form_error: 'Une erreur est survenue lors de l’envoi. Veuillez vérifier votre connexion.',
      contact_office_hours: 'Accueil du public selon les horaires officiels.',

      // FAQ
      faq_title: 'Foire Aux Questions (FAQ)',
      faq_subtitle: 'Trouvez immédiatement les réponses aux interrogations les plus fréquentes des usagers.',
      faq_search_placeholder: 'Rechercher une question ou un mot-clé...',

      // News / Articles
      articles_title: 'Actualités & Avis aux Usagers',
      articles_subtitle: 'Informations récentes du Bureau de Poste de Sidi Ali Ben Aoun',
      article_read_more: 'Lire la suite',

      // Admin
      admin_title: 'Tableau de Bord Administratif',
      admin_subtitle: 'Gestion du contenu, suivi des messages citoyens et paramétrage',
      admin_kpi_services: 'Services Actifs',
      admin_kpi_categories: 'Catégories',
      admin_kpi_articles: 'Articles & Avis',
      admin_kpi_messages_pending: 'Messages en Attente',
      admin_kpi_messages_total: 'Total Messages',
      admin_kpi_guides: 'Guides D17',
      admin_tab_dashboard: 'Vue d’ensemble',
      admin_tab_services: 'Gestion Services',
      admin_tab_categories: 'Gestion Catégories',
      admin_tab_articles: 'Actualités',
      admin_tab_guides: 'Guides D17',
      admin_tab_faqs: 'Gestion FAQ',
      admin_tab_messages: 'Messages & Réclamations',
      admin_tab_users: 'Utilisateurs',
      admin_tab_settings: 'Paramètres Bureau',
      admin_action_add: 'Ajouter',
      admin_action_edit: 'Modifier',
      admin_action_delete: 'Supprimer',
      admin_action_save: 'Enregistrer',
      admin_action_cancel: 'Annuler',
      admin_status_pending: 'En attente',
      admin_status_reviewed: 'En cours d’examen',
      admin_status_replied: 'Répondu',
      admin_table_actions: 'Actions',
      admin_confirm_delete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',

      // Footer
      footer_about_title: 'À Propos de SABO POSTE',
      footer_about_desc: 'Plateforme numérique conçue pour moderniser et faciliter l’accès à l’information postale et financière des usagers du Bureau de Poste de Sidi Ali Ben Aoun.',
      footer_links_title: 'Navigation Rapide',
      footer_contact_title: 'Coordonnées Officielles',
      footer_rights: '© 2026 SABO POSTE — Bureau de Poste de Sidi Ali Ben Aoun. Tous droits réservés.',
      footer_attribution: 'Projet développé par Yassin Wannassi sous l’encadrement de M. Abed El Monem Jawadi — ISET Sidi Bouzid.'
    },

    ar: {
      // General & Brand
      brand_title: 'سابو بوست 2.0',
      brand_subtitle: 'مكتب بريد سيدي علي بن عون (9120)',
      brand_slogan: 'المعلومة البريدية والمالية واضحة وقريبة من المواطن',
      academic_badge: 'مشروع جامعي — تربص تحسين الكفاءة 2026',

      // Nav
      nav_home: 'الرئيسية',
      nav_services: 'خدماتنا',
      nav_horaires: 'المواعيد والمقر',
      nav_d17: 'فضاء D17',
      nav_faq: 'الأسئلة الشائعة',
      nav_news: 'المستجدات',
      nav_contact: 'اتصل بنا',
      nav_admin: 'لوحة الإدارة',
      nav_login: 'دخول الإدارة',
      nav_logout: 'تسجيل الخروج',

      // Hero
      hero_badge: 'المنصة الرقمية الرسمية للإعلام البريدي',
      hero_title: 'مرحباً بكم في مكتب بريد سيدي علي بن عون',
      hero_subtitle: 'اكتشفوا كافة الخدمات البريدية والمالية، تعلموا كيفية استخدام تطبيق D17 وبطاقات دينار إلكتروني، وخططوا لزيارتكم دون انتظار.',
      hero_btn_services: 'استكشاف الخدمات',
      hero_btn_d17: 'دليل تطبيق D17',
      hero_btn_hours: 'مواعيد العمل',
      hero_search_placeholder: 'ابحث عن خدمة (D17، دينار إلكتروني، حوالة، فواتير، طرود...)',

      // Agency Live Status
      status_open: 'مفتوح حالياً للعموم',
      status_closed: 'مغلق حالياً',
      status_half_day: 'حصة السبت الصباحية',
      status_today_hours: 'أوقات العمل اليوم:',

      // Stats
      stat_services: 'خدمة مفصلة بالدليل',
      stat_counters: 'شبابيك عمل نشطة',
      stat_satisfaction: 'تسهيل المعاملات',
      stat_d17_access: 'إرشاد رقمي متواصل',

      // Categories
      categories_title: 'مجالات الخدمات البريدية والمالية',
      categories_subtitle: 'الوصول السريع إلى كافة المعلومات والتوضيحات حسب حاجتكم',
      cat_all: 'كافة الخدمات',

      // Services page
      services_title: 'دليل الخدمات البريدية والمالية',
      services_subtitle: 'شروحات دقيقة، الوثائق المطلوبة، الإجراءات لدى الشباك والآجال المعتمدة',
      service_requirements: 'الوثائق والمستندات المطلوبة:',
      service_steps: 'مراحل إنجاز الخدمة:',
      service_delivery: 'المدة المقدرة:',
      service_category: 'الصنف:',
      service_btn_details: 'عرض تفاصيل الإجراء الكامل',
      service_modal_close: 'إغلاق',
      service_popular: 'شائع ومطلوب',
      service_featured: 'أولوية',

      // D17
      d17_hero_title: 'فضاء تطبيق D17 — DIGI POST BANK',
      d17_hero_subtitle: 'التطبيق المالي للبريد التونسي لخلاص الفواتير، تحويل الأموال والتحكم في البطاقات في الحين.',
      d17_why_title: 'لماذا نستخدم تطبيق D17 ؟',
      d17_why_1_title: 'دون أي تنقل',
      d17_why_1_desc: 'خلاص فواتير الكهرباء والماء والاتصالات من منزلك في أي وقت 24/7.',
      d17_why_2_title: 'تحويلات فورية',
      d17_why_2_desc: 'إرسال واستقبال الأموال في ثوانٍ عبر الحوالة الفورية أو من بطاقة إلى أخرى.',
      d17_why_3_title: 'حماية وأمان عالي',
      d17_why_3_desc: 'معاملات مؤمنة برمز سري وتأكيد فوري عبر رسائل نصية قصيرة.',
      d17_cards_title: 'البطاقات المتوافقة مع D17',
      d17_cards_subtitle: 'اربط بطاقتك البريدية بالتطبيق للاستفادة من كافة الخدمات المتاحة',
      d17_student_focus_title: 'خاص بالطلبة والتلاميذ : بطاقة دينار الشباب',
      d17_student_focus_desc: 'البطاقة الأساسية لتلاميذ وطلبة سيدي علي بن عون: التسجيل الجامعي وصرف المنح المدرسية.',
      d17_guides_title: 'دلائل الاستخدام المصورة لتطبيق D17',

      // Horaires & Agency
      horaires_title: 'مواعيد العمل ومعلومات المكتب',
      horaires_subtitle: 'مكتب بريد سيدي علي بن عون — الترقيم البريدي 9120',
      horaires_table_day: 'اليوم',
      horaires_table_morning: 'الحصة الصباحية',
      horaires_table_afternoon: 'الحصة المسائية',
      horaires_table_status: 'الحالة',
      horaires_mon: 'الاثنين',
      horaires_tue: 'الثلاثاء',
      horaires_wed: 'الأربعاء',
      horaires_thu: 'الخميس',
      horaires_fri: 'الجمعة',
      horaires_sat: 'السبت',
      horaires_sun: 'الأحد',
      horaires_closed_text: 'مغلق',
      agency_address_label: 'العنوان :',
      agency_phone_label: 'الهاتف :',
      agency_email_label: 'البريد الإلكتروني :',
      agency_counters_label: 'الشبابيك المفتوحة :',
      agency_supervisor_label: 'المسؤول :',
      agency_features_title: 'الخدمات المتوفرة على عين المكان :',

      // Contact
      contact_title: 'تواصل مع مكتب البريد',
      contact_subtitle: 'لديك استفسار حول خدمة، شكوى أو رغبة في التوجيه ؟ راسلنا مباشرة.',
      form_name: 'الاسم واللقب',
      form_email: 'البريد الإلكتروني',
      form_phone: 'رقم الهاتف (اختياري)',
      form_category: 'الخدمة المعنية',
      form_subject: 'موضوع الرسالة',
      form_message: 'نص الرسالة أو الاستفسار',
      form_submit: 'إرسال الرسالة',
      form_sending: 'جاري الإرسال...',
      form_success: 'تم تسجيل رسالتكم بنجاح! سيقوم فريق المكتب بالإجابة في أقرب الآجال.',
      form_error: 'حدث خطأ أثناء الإرسال. يرجى التحقق من الاتصال بالإنترنت.',
      contact_office_hours: 'استقبال العموم يتم وفق أوقات العمل الرسمية.',

      // FAQ
      faq_title: 'الأسئلة الشائعة (FAQ)',
      faq_subtitle: 'إجابات واضحة ودقيقة عن أكثر التساؤلات تكراراً لدى رواد مكتب البريد.',
      faq_search_placeholder: 'ابحث عن سؤال أو كلمة مفتاحية...',

      // News / Articles
      articles_title: 'المستجدات والبلاغات للمواطنين',
      articles_subtitle: 'آخر أخبار وإعلانات مكتب بريد سيدي علي بن عون',
      article_read_more: 'قراءة المزيد',

      // Admin
      admin_title: 'لوحة التحكم الإدارية',
      admin_subtitle: 'إدارة المحتوى، متابعة رسائل واستفسارات المواطنين وتعديل البيانات',
      admin_kpi_services: 'الخدمات المتاحة',
      admin_kpi_categories: 'الأصناف',
      admin_kpi_articles: 'البلاغات والأخبار',
      admin_kpi_messages_pending: 'رسائل بالانتظار',
      admin_kpi_messages_total: 'مجموع الرسائل',
      admin_kpi_guides: 'دلائل D17',
      admin_tab_dashboard: 'نظرة عامة',
      admin_tab_services: 'إدارة الخدمات',
      admin_tab_categories: 'إدارة الأصناف',
      admin_tab_articles: 'إدارة البلاغات',
      admin_tab_guides: 'دلائل D17',
      admin_tab_faqs: 'إدارة الأسئلة',
      admin_tab_messages: 'صندوق الاستفسارات',
      admin_tab_users: 'المستخدمون',
      admin_tab_settings: 'إعدادات المكتب',
      admin_action_add: 'إضافة',
      admin_action_edit: 'تعديل',
      admin_action_delete: 'حذف',
      admin_action_save: 'حفظ التغييرات',
      admin_action_cancel: 'إلغاء',
      admin_status_pending: 'قيد الانتظار',
      admin_status_reviewed: 'قيد المعاينة',
      admin_status_replied: 'تمت الإجابة',
      admin_table_actions: 'الإجراءات',
      admin_confirm_delete: 'هل أنت متأكد من رغبتك في حذف هذا العنصر ؟',

      // Footer
      footer_about_title: 'حول منصة سابو بوست',
      footer_about_desc: 'منصة رقمية موجهة لتطوير وتقريب المعلومة البريدية والمالية لفائدة مواطني ومتعاملي مكتب بريد سيدي علي بن عون.',
      footer_links_title: 'روابط سريعة',
      footer_contact_title: 'بيانات الاتصال الرسمية',
      footer_rights: '© 2026 سابو بوست — مكتب بريد سيدي علي بن عون. جميع الحقوق محفوظة.',
      footer_attribution: 'إنجاز الطالب ياسين وناسي بإشراف الأستاذ عبد المنعم جوادي — المعهد العالي للدراسات التكنولوجية بسيدي بوزيد.'
    },

    en: {
      // General & Brand
      brand_title: 'SABO POSTE 2.0',
      brand_subtitle: 'Sidi Ali Ben Aoun Post Office (9120)',
      brand_slogan: 'Clear and accessible postal & digital services information',
      academic_badge: 'Academic Project — Internship Report 2026',

      // Nav
      nav_home: 'Home',
      nav_services: 'Our Services',
      nav_horaires: 'Hours & Agency',
      nav_d17: 'D17 Hub',
      nav_faq: 'FAQ',
      nav_news: 'Announcements',
      nav_contact: 'Contact Us',
      nav_admin: 'Administration',
      nav_login: 'Admin Login',
      nav_logout: 'Logout',

      // Hero
      hero_badge: 'Official Postal Information Platform',
      hero_title: 'Welcome to Sidi Ali Ben Aoun Post Office',
      hero_subtitle: 'Explore postal and financial services, master the D17 mobile app, understand e-DINAR cards, and plan your office visit efficiently.',
      hero_btn_services: 'Explore Services',
      hero_btn_d17: 'Discover D17',
      hero_btn_hours: 'View Opening Hours',
      hero_search_placeholder: 'Search for a service (D17, e-DINAR, money transfer, bills, parcels...)',

      // Agency Live Status
      status_open: 'Currently Open',
      status_closed: 'Currently Closed',
      status_half_day: 'Saturday Morning Shift',
      status_today_hours: "Today's Operating Hours:",

      // Stats
      stat_services: 'Indexed Services',
      stat_counters: 'Active Counters',
      stat_satisfaction: 'Streamlined Guidance',
      stat_d17_access: '24/7 D17 Support',

      // Categories
      categories_title: 'Service Categories',
      categories_subtitle: 'Quick access to key postal and financial information tailored to your needs',
      cat_all: 'All Services',

      // Services page
      services_title: 'Postal & Financial Services Catalog',
      services_subtitle: 'Complete guides, required identification documents, counter procedures, and delivery times',
      service_requirements: 'Required Documents:',
      service_steps: 'Step-by-Step Procedure:',
      service_delivery: 'Estimated Timeframe:',
      service_category: 'Category:',
      service_btn_details: 'View Full Procedure',
      service_modal_close: 'Close',
      service_popular: 'Popular',
      service_featured: 'Featured',

      // D17
      d17_hero_title: 'D17 Mobile Hub — DIGI POST BANK',
      d17_hero_subtitle: 'Tunisian Post official mobile app for instant bills payment, money transfers, and real-time card management.',
      d17_why_title: 'Why Use D17?',
      d17_why_1_title: 'No Travel Needed',
      d17_why_1_desc: 'Pay electricity, water, and telecom invoices from home at any time 24/7.',
      d17_why_2_title: 'Instant Transfers',
      d17_why_2_desc: 'Send money instantly to family and partners by cash voucher or card-to-card.',
      d17_why_3_title: 'High Security',
      d17_why_3_desc: 'All operations secured by confidential PIN and immediate SMS notifications.',
      d17_cards_title: 'Cards Compatible with D17',
      d17_cards_subtitle: 'Pair your postal payment card with the app to unlock all features',
      d17_student_focus_title: 'Student Focus: e-DINAR Youth Card',
      d17_student_focus_desc: 'The essential card for Sidi Ali Ben Aoun students: scholarships, university loans, and online tuition payments.',
      d17_guides_title: 'Interactive D17 Practical Guides',

      // Horaires & Agency
      horaires_title: 'Opening Hours & Location',
      horaires_subtitle: 'Sidi Ali Ben Aoun Post Office — Postal Code 9120',
      horaires_table_day: 'Day',
      horaires_table_morning: 'Morning Shift',
      horaires_table_afternoon: 'Afternoon Shift',
      horaires_table_status: 'Status',
      horaires_mon: 'Monday',
      horaires_tue: 'Tuesday',
      horaires_wed: 'Wednesday',
      horaires_thu: 'Thursday',
      horaires_fri: 'Friday',
      horaires_sat: 'Saturday',
      horaires_sun: 'Sunday',
      horaires_closed_text: 'Closed',
      agency_address_label: 'Address:',
      agency_phone_label: 'Phone:',
      agency_email_label: 'Email:',
      agency_counters_label: 'Active Counters:',
      agency_supervisor_label: 'Supervisor:',
      agency_features_title: 'Counter Services Available On-Site:',

      // Contact
      contact_title: 'Contact the Post Office',
      contact_subtitle: 'Have a question about a service, a suggestion, or need guidance? Send us a message.',
      form_name: 'Full Name',
      form_email: 'Email Address',
      form_phone: 'Phone Number (Optional)',
      form_category: 'Related Service',
      form_subject: 'Subject',
      form_message: 'Your Message / Inquiry',
      form_submit: 'Submit Message',
      form_sending: 'Sending...',
      form_success: 'Your message has been sent successfully! Our post office team will respond promptly.',
      form_error: 'An error occurred while submitting. Please check your network connection.',
      contact_office_hours: 'Public reception follows official business hours.',

      // FAQ
      faq_title: 'Frequently Asked Questions (FAQ)',
      faq_subtitle: 'Find immediate answers to the most common customer questions.',
      faq_search_placeholder: 'Search questions or keywords...',

      // News / Articles
      articles_title: 'News & Official Announcements',
      articles_subtitle: 'Latest updates from Sidi Ali Ben Aoun Post Office',
      article_read_more: 'Read more',

      // Admin
      admin_title: 'Administrative Dashboard',
      admin_subtitle: 'Content management, citizen message tracking, and system configuration',
      admin_kpi_services: 'Active Services',
      admin_kpi_categories: 'Categories',
      admin_kpi_articles: 'Announcements',
      admin_kpi_messages_pending: 'Pending Inquiries',
      admin_kpi_messages_total: 'Total Inquiries',
      admin_kpi_guides: 'D17 Guides',
      admin_tab_dashboard: 'Overview',
      admin_tab_services: 'Services Management',
      admin_tab_categories: 'Categories Management',
      admin_tab_articles: 'Articles Management',
      admin_tab_guides: 'D17 Guides',
      admin_tab_faqs: 'FAQ Management',
      admin_tab_messages: 'Inquiries Inbox',
      admin_tab_users: 'Users Management',
      admin_tab_settings: 'Office Settings',
      admin_action_add: 'Add New',
      admin_action_edit: 'Edit',
      admin_action_delete: 'Delete',
      admin_action_save: 'Save Changes',
      admin_action_cancel: 'Cancel',
      admin_status_pending: 'Pending',
      admin_status_reviewed: 'Under Review',
      admin_status_replied: 'Replied',
      admin_table_actions: 'Actions',
      admin_confirm_delete: 'Are you sure you want to delete this record?',

      // Footer
      footer_about_title: 'About SABO POSTE',
      footer_about_desc: 'Digital platform created to modernize and facilitate access to postal and financial information for citizens at Sidi Ali Ben Aoun Post Office.',
      footer_links_title: 'Quick Links',
      footer_contact_title: 'Official Contact',
      footer_rights: '© 2026 SABO POSTE — Sidi Ali Ben Aoun Post Office. All rights reserved.',
      footer_attribution: 'Developed by student Yassin Wannassi under supervision of Mr. Abed El Monem Jawadi — ISET Sidi Bouzid.'
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
    if (this.currentLangSubject.value === lang) return;
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
    if (table[key]) return table[key];
    // Fallback to french
    return this.translations.fr[key] || key;
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
