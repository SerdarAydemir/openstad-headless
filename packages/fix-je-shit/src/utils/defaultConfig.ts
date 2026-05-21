import type {
  ActionCardConfig,
  FixJeShitConfig,
  GemeenteConfig,
  HelpCardConfig,
} from '../types';
import { alleGemeenten } from './gemeentenData';

// ============================================================
// Default Template — used for gemeenten without custom cards
// ============================================================

const defaultActionCards: ActionCardConfig[] = [
  {
    id: 'action-digid',
    linkedToFlag: 'digid_status',
    title: 'DigiD aanvragen',
    description:
      'Vraag een DigiD aan om online zaken te regelen met de overheid.',
    icon: 'digid',
    url: 'https://www.digid.nl/aanvragen-en-activeren/digid-aanvragen/',
    buttonText: 'Fix dit nu',
    priority: true,
  },
  {
    id: 'action-zorgverzekering',
    linkedToFlag: 'zorgverzekering_status',
    title: 'Zorgverzekering afsluiten',
    description:
      'Je moet binnen 4 maanden een zorgverzekering afsluiten in Nederland.',
    icon: 'zorgverzekering',
    url: 'https://www.consumentenbond.nl/zorgverzekering',
    buttonText: 'Fix dit nu',
    priority: true,
  },
  {
    id: 'action-zorgtoeslag',
    linkedToFlag: 'zorgtoeslag_status',
    title: 'Zorgtoeslag aanvragen',
    description:
      'Vraag zorgtoeslag aan bij de Belastingdienst om mee te betalen aan je zorgverzekering.',
    icon: 'zorgtoeslag',
    url: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/toeslagen',
    buttonText: 'Fix dit nu',
    priority: false,
  },
  {
    id: 'action-inschrijven',
    linkedToFlag: 'woning_inschrijving_status',
    title: 'Inschrijven bij gemeente',
    description:
      'Dit moet binnen 5 dagen na verhuizing. Maak een afspraak bij je gemeente.',
    icon: 'inschrijven',
    url: 'https://www.rijksoverheid.nl/onderwerpen/verhuizen/verhuizing-doorgeven',
    buttonText: 'Fix dit nu',
    priority: true,
  },
  {
    id: 'action-huurwoning',
    linkedToFlag: 'sociale_huurwoning_status',
    title: 'Inschrijven sociale huurwoning',
    description: 'Schrijf je in voor een sociale huurwoning in je regio.',
    icon: 'wonen',
    url: 'https://www.rijksoverheid.nl/onderwerpen/huurwoning',
    buttonText: 'Fix dit nu',
    priority: false,
  },
  {
    id: 'action-studiefinanciering',
    linkedToFlag: 'studiefinanciering_status',
    title: 'Studiefinanciering aanvragen',
    description: 'Vraag studiefinanciering aan bij DUO.',
    icon: 'studie',
    url: 'https://duo.nl/particulier/',
    buttonText: 'Fix dit nu',
    priority: false,
  },
  {
    id: 'action-ov',
    linkedToFlag: 'studenten_ov_status',
    title: 'Studenten OV aanvragen',
    description:
      'Met studenten OV reis je gratis met het OV tijdens week of weekend.',
    icon: 'studenten_ov',
    url: 'https://duo.nl/particulier/studentenreisproduct.jsp',
    buttonText: 'Fix dit nu',
    priority: false,
  },
  {
    id: 'action-bankrekening',
    linkedToFlag: 'bankrekening_status',
    title: 'Bankrekening openen',
    description:
      'Open een bankrekening op je eigen naam voor studiefinanciering en salaris.',
    icon: 'bankrekening',
    url: 'https://www.consumentenbond.nl/betaalrekening',
    buttonText: 'Fix dit nu',
    priority: true,
  },
];

const defaultHelpCards: HelpCardConfig[] = [
  {
    id: 'help-geldzaken',
    title: 'Hulp bij geldzaken',
    description: 'Zoek hulp bij geldzorgen of schulden in je gemeente.',
    icon: 'geldzorgen',
    url: 'https://www.geldfit.nl/',
    buttonText: 'Bekijk hulp',
  },
  {
    id: 'help-jongeren',
    title: 'Informatie voor jongeren',
    description: 'Algemene informatie over regelingen voor jongeren.',
    icon: 'informatie',
    url: 'https://www.rijksoverheid.nl/onderwerpen/jongeren',
    buttonText: 'Meer informatie',
  },
];

// ============================================================
// Gemeente-specific overrides
// ============================================================

const gemeenteOverrides: Record<string, Partial<GemeenteConfig>> = {
  nijmegen: {
    searchTerms: ['Nimwegen'],
    actionCards: [
      {
        id: 'action-digid',
        linkedToFlag: 'digid_status',
        title: 'DigiD aanvragen',
        description:
          'Vraag een DigiD aan om online zaken te regelen met de overheid.',
        icon: 'digid',
        url: 'https://www.digid.nl/aanvragen-en-activeren/digid-aanvragen/',
        buttonText: 'Fix dit nu',
        priority: true,
      },
      {
        id: 'action-zorgverzekering',
        linkedToFlag: 'zorgverzekering_status',
        title: 'Zorgverzekering afsluiten',
        description:
          'Je moet binnen 4 maanden een zorgverzekering afsluiten in Nederland.',
        icon: 'zorgverzekering',
        url: 'https://www.consumentenbond.nl/zorgverzekering',
        buttonText: 'Fix dit nu',
        priority: true,
      },
      {
        id: 'action-zorgtoeslag',
        linkedToFlag: 'zorgtoeslag_status',
        title: 'Zorgtoeslag aanvragen',
        description: 'Vraag zorgtoeslag aan bij de Belastingdienst.',
        icon: 'zorgtoeslag',
        url: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/toeslagen',
        buttonText: 'Fix dit nu',
        priority: false,
      },
      {
        id: 'action-inschrijven',
        linkedToFlag: 'woning_inschrijving_status',
        title: 'Inschrijven bij gemeente',
        description:
          'Dit moet binnen 5 dagen na verhuizing. Maak een afspraak bij je gemeente.',
        icon: 'inschrijven',
        url: 'https://www.nijmegen.nl/diensten/verhuizing-doorgeven/',
        buttonText: 'Fix dit nu',
        priority: true,
      },
      {
        id: 'action-huurwoning',
        linkedToFlag: 'sociale_huurwoning_status',
        title: 'Inschrijven sociale huurwoning',
        description: 'Schrijf je in voor een sociale huurwoning via Entree.',
        icon: 'wonen',
        url: 'https://www.entree.nu/Inschrijven',
        buttonText: 'Fix dit nu',
        priority: false,
      },
      {
        id: 'action-studiefinanciering',
        linkedToFlag: 'studiefinanciering_status',
        title: 'Studiefinanciering aanvragen',
        description: 'Vraag studiefinanciering aan bij DUO.',
        icon: 'studie',
        url: 'https://duo.nl/particulier/',
        buttonText: 'Fix dit nu',
        priority: false,
      },
      {
        id: 'action-ov',
        linkedToFlag: 'studenten_ov_status',
        title: 'Studenten OV aanvragen',
        description: 'Met studenten OV reis je gratis met het OV.',
        icon: 'studenten_ov',
        url: 'https://duo.nl/particulier/studentenreisproduct.jsp',
        buttonText: 'Fix dit nu',
        priority: false,
      },
      {
        id: 'action-bankrekening',
        linkedToFlag: 'bankrekening_status',
        title: 'Bankrekening openen',
        description: 'Open een bankrekening op je eigen naam.',
        icon: 'bankrekening',
        url: 'https://www.consumentenbond.nl/betaalrekening',
        buttonText: 'Fix dit nu',
        priority: true,
      },
    ],
    helpCards: [
      {
        id: 'help-geldzaken',
        title: 'Hulp bij geldzaken',
        description: 'De gemeente kan helpen bij geldzorgen of schulden.',
        icon: 'geldzorgen',
        url: 'https://www.nijmegen.nl/diensten/uitkering-schulden-laag-inkomen/hulp-bij-geldzorgen/',
        buttonText: 'Bekijk hulp',
      },
      {
        id: 'help-studietoeslag',
        title: 'Studietoeslag',
        description: 'Misschien heb je recht op studietoeslag via de gemeente.',
        icon: 'studie',
        url: 'https://www.nijmegen.nl/diensten/uitkering-schulden-laag-inkomen/studietoeslag/',
        buttonText: 'Bekijk regeling',
      },
      {
        id: 'help-jongeren',
        title: 'Informatie voor jongeren',
        description: 'Informatie over wonen, werk en studie voor jongeren.',
        icon: 'informatie',
        url: 'https://www.nijmegen.nl/diensten/jongeren-fix-je-shit/',
        buttonText: 'Meer informatie',
      },
    ],
    contact: {
      phone: '06-57723415',
      email: 'jongeren@stipnijmegen.nl',
      instagramUrl: 'https://www.instagram.com/jongerenstip/',
      openingHours: 'Maandag van 14.00 - 17.00 uur',
      address: 'Van Berchenstraat 3b Nijmegen',
    },
  },
};

// ============================================================
// Build full gemeenten list from CSV data + overrides
// ============================================================

function buildGemeenten(): GemeenteConfig[] {
  return alleGemeenten.map((g) => {
    const override = gemeenteOverrides[g.id];
    return {
      id: g.id,
      name: g.name,
      officialName: g.officialName,
      websiteUrl: g.websiteUrl,
      searchTerms: override?.searchTerms,
      actionCards: override?.actionCards,
      helpCards: override?.helpCards,
      contact: override?.contact,
    };
  });
}

// ============================================================
// Export
// ============================================================

export const defaultConfig: FixJeShitConfig = {
  general: {
    widgetTitle: 'FixJeShit',
    landingTitle: 'Fix je Shit',
    landingDescription:
      'Word je 18 of ben je net 18 geworden? Check in 2 minuten of je belangrijke regelzaken op orde hebt.',
    startButtonText: 'Start de check',
    estimatedTime: '±15 vragen • 2 minuten',
    tipText:
      'Blijf je administratie up-to-date houden. Check elk half jaar of alles nog klopt, vooral bij een verhuizing of nieuwe baan.',
    gemeenteSelectTitle: 'In welke gemeente woon je?',
    gemeenteSelectPlaceholder: 'Zoek je gemeente',
    gemeenteSelectHelper:
      'We gebruiken je gemeente om lokale hulp en regelingen te tonen.',
    scoreTitle: 'Jouw Fix Score',
    scoreDescriptionGood: 'Goed bezig! Je hebt bijna alles geregeld.',
    scoreDescriptionMedium: 'Er zijn nog belangrijke zaken te regelen.',
    scoreDescriptionBad: 'Er zijn veel zaken die je nog moet fixen!',
    fixSectionTitle: 'Wat moet je nog fixen',
    helpSectionTitle: 'Hulp in [gemeente]',
  },
  branding: {
    primaryColor: '#2F8F3F',
    errorColor: '#B71C1C',
    progressColor: '#6D2909',
    scoreCompleteColor: '#22C55E',
    scoreIncompleteColor: '#EF4444',
    warningColor: '#D97706',
    backgroundColor: '#F3F4F6',
    cardBackground: '#FFFFFF',
  },
  categories: [
    {
      id: 'identiteit',
      label: 'Identiteit',
      color: '#6366F1',
      questions: [
        {
          id: 'digid',
          title: 'Heb je een DigiD?',
          description: 'Met een DigiD regel je zaken met de overheid.',
          type: 'binary',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
          ],
          flagKey: 'digid_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-digid',
        },
      ],
    },
    {
      id: 'zorgverzekering',
      label: 'Zorgverzekering',
      color: '#2563EB',
      questions: [
        {
          id: 'zorgverzekering',
          title: 'Heb je een zorgverzekering?',
          description:
            'Iedereen vanaf 18 jaar moet een zorgverzekering hebben.',
          type: 'binary',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
          ],
          flagKey: 'zorgverzekering_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-zorgverzekering',
        },
        {
          id: 'zorgtoeslag',
          title: 'Ontvang je zorgtoeslag?',
          description:
            'Zorgtoeslag helpt met de kosten van je zorgverzekering.',
          type: 'multi',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
            { label: 'Weet ik niet', value: 'unknown' },
          ],
          flagKey: 'zorgtoeslag_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-zorgtoeslag',
        },
      ],
    },
    {
      id: 'wonen',
      label: 'Wonen',
      color: '#059669',
      questions: [
        {
          id: 'woonadres',
          title: 'Sta je ingeschreven op je woonadres?',
          description: 'Je moet je inschrijven bij de gemeente waar je woont.',
          type: 'binary',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
          ],
          flagKey: 'woning_inschrijving_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-inschrijven',
        },
        {
          id: 'sociale-huurwoning',
          title: 'Heb je je ingeschreven voor een sociale huurwoning?',
          description:
            'De wachttijd is vaak lang. Schrijf je daarom op tijd in.',
          type: 'multi',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
            { label: 'Weet ik niet', value: 'unknown' },
          ],
          flagKey: 'sociale_huurwoning_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-huurwoning',
        },
      ],
    },
    {
      id: 'studie',
      label: 'Studie',
      color: '#9333EA',
      questions: [
        {
          id: 'studiefinanciering',
          title: 'Heb je studiefinanciering aangevraagd?',
          description: 'Studenten kunnen studiefinanciering aanvragen bij DUO.',
          type: 'multi',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
            { label: 'Weet ik niet', value: 'unknown' },
          ],
          flagKey: 'studiefinanciering_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-studiefinanciering',
        },
        {
          id: 'studenten-ov',
          title: 'Heb je een studenten OV?',
          description: 'Met een studenten OV reis je gratis of met korting.',
          type: 'binary',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
          ],
          flagKey: 'studenten_ov_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-ov',
        },
      ],
    },
    {
      id: 'werk-geld',
      label: 'Werk & geld',
      color: '#DC2626',
      questions: [
        {
          id: 'bankrekening',
          title: 'Heb je een bankrekening op je eigen naam?',
          description:
            'Voor salaris en studiefinanciering heb je een eigen bankrekening nodig.',
          type: 'binary',
          options: [
            { label: 'Nog niet geregeld', value: 'incomplete' },
            { label: 'Ja, geregeld', value: 'complete' },
          ],
          flagKey: 'bankrekening_status',
          flagValueOnIncomplete: 'ontbreekt',
          linkedActionCardId: 'action-bankrekening',
        },
        {
          id: 'geldzorgen',
          title:
            'Maak je je weleens zorgen over geld of heb je rekeningen die je niet kunt betalen?',
          description:
            'Geldzorgen leiden tot stress. Op tijd hulp zoeken geeft rust.',
          type: 'binary',
          options: [
            { label: 'Nee', value: 'complete' },
            { label: 'Ja', value: 'incomplete' },
          ],
          flagKey: 'geldzorgen_status',
          flagValueOnIncomplete: 'true',
        },
      ],
    },
  ],
  defaultTemplate: {
    actionCards: defaultActionCards,
    helpCards: defaultHelpCards,
  },
  gemeenten: buildGemeenten(),
};
