import { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-09-06",
    meetingType: "testimony",
    presiding: "Bishop Michael Anderson",
    conducting: "Brother James Wilson",
    announcements: [
      "Ward activity Friday at 7:00 PM",
      "Temple recommend interviews after church",
    ],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Emily Johnson",
    wardBusiness: [
      {
        description: "Sustain new Primary teachers",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Ward Members",
        topic: "Testimonies",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 152,
      title: "God Be with You Till We Meet Again",
    },
    closingPrayer: "Brother Daniel Smith",
  },

  {
    id: 2,
    date: "2026-09-13",
    meetingType: "regular",
    presiding: "Bishop Michael Anderson",
    conducting: "Brother Robert Taylor",
    announcements: ["Youth activity Wednesday at 7:00 PM"],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Sarah Miller",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 196,
      title: "Jesus, Once of Humble Birth",
    },
    speakers: [
      {
        name: "Brother David Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Sister Rachel Davis",
        topic: "Serving Others",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 89,
      title: "The Lord Is My Light",
    },
    closingPrayer: "Brother Thomas Clark",
  },

  {
    id: 3,
    date: "2026-09-20",
    meetingType: "regular",
    presiding: "Bishop Michael Anderson",
    conducting: "Brother James Wilson",
    announcements: ["Ward conference will be held next month"],
    openingHymn: {
      number: 6,
      title: "Redeemer of Israel",
    },
    openingPrayer: "Sister Amanda White",
    wardBusiness: [
      {
        description: "Release and sustain Young Men advisers",
      },
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "Sister Laura Martinez",
        topic: "Following the Savior",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "Come Thou Fount",
        type: "musical-number",
      },
      {
        name: "Brother Kevin Thompson",
        topic: "Personal Revelation",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 98,
      title: "I Need Thee Every Hour",
    },
    closingPrayer: "Sister Rebecca Harris",
  },

  {
    id: 4,
    date: "2026-09-27",
    meetingType: "regular",
    presiding: "Bishop Michael Anderson",
    conducting: "Brother Robert Taylor",
    announcements: ["General Conference is next weekend"],
    openingHymn: {
      number: 21,
      title: "Come, Listen to a Prophet's Voice",
    },
    openingPrayer: "Brother Steven Lewis",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: "In Humility, Our Savior",
    },
    speakers: [
      {
        name: "Sister Jennifer Moore",
        topic: "Living Prophets",
        type: "speaker",
      },
      {
        name: "Brother Andrew Hall",
        topic: "Preparing for General Conference",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet",
    },
    closingPrayer: "Sister Elizabeth Young",
  },

  {
    id: 5,
    date: "2026-10-04",
    meetingType: "general",
    presiding: "First Presidency",
    conducting: "General Authorities",
    announcements: ["General Conference weekend"],
    openingHymn: {
      number: 5,
      title: "High on the Mountain Top",
    },
    openingPrayer: "Assigned Speaker",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "General Authorities",
        topic: "General Conference",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 134,
      title: "I Believe in Christ",
    },
    closingPrayer: "Assigned Speaker",
  },
];

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(
  date: string
): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.date === date);
}