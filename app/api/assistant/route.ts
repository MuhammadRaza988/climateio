import { type NextRequest, NextResponse } from "next/server"

const knowledgeBase = {
  en: {
    "water safety": {
      content:
        "To ensure water safety, always test water from unknown sources. Boil water for at least 3-5 minutes to kill bacteria and viruses. Use water purification tablets if boiling isn't possible. Look for signs of contamination like unusual color, odor, or taste.",
      citations: [
        {
          title: "WHO Water Safety Guidelines",
          url: "https://who.int/water_sanitation_health/publications/drinking-water-quality-guidelines",
          snippet: "Boiling water for 3-5 minutes effectively eliminates most pathogens",
        },
        {
          title: "Pakistan Water Quality Standards",
          url: "https://pcrwr.gov.pk/water-quality-standards",
          snippet: "National standards for safe drinking water parameters",
        },
      ],
    },
    "flood water": {
      content:
        "Flood water is extremely dangerous and should never be consumed. It contains sewage, chemicals, and debris. After floods, wait for official clearance before using municipal water. Use bottled water or properly treated alternatives. Disinfect wells and storage tanks before use.",
      citations: [
        {
          title: "NDMA Flood Safety Guidelines",
          url: "https://ndma.gov.pk/flood-safety",
          snippet: "Comprehensive guidelines for water safety during and after floods",
        },
      ],
    },
    "brown water": {
      content:
        "Brown or discolored water usually indicates high turbidity from sediment, rust, or organic matter. While not always dangerous, it should be filtered and tested. Common causes include pipe corrosion, construction work, or natural sediment. Contact your water authority if discoloration persists.",
      citations: [
        {
          title: "Water Discoloration Causes",
          url: "https://example.com/water-discoloration",
          snippet: "Understanding different types of water discoloration and their causes",
        },
      ],
    },
    testing: {
      content:
        "Home water testing can be done using test strips for basic parameters like pH, chlorine, and hardness. For comprehensive testing, contact certified laboratories. Test for bacteria, heavy metals, and chemical contaminants. Regular testing is recommended, especially for private wells.",
      citations: [
        {
          title: "Home Water Testing Guide",
          url: "https://example.com/water-testing",
          snippet: "Step-by-step guide for testing water quality at home",
        },
      ],
    },
  },
  ur: {
    "water safety": {
      content:
        "پانی کی حفاظت کو یقینی بنانے کے لیے، نامعلوم ذرائع سے آنے والے پانی کو ہمیشہ ٹیسٹ کریں۔ بیکٹیریا اور وائرس کو مارنے کے لیے پانی کو کم از کم 3-5 منٹ تک ابالیں۔ اگر ابالنا ممکن نہ ہو تو پانی صاف کرنے والی گولیاں استعمال کریں۔ آلودگی کی علامات جیسے غیر معمولی رنگ، بو، یا ذائقہ کو دیکھیں۔",
      citations: [
        {
          title: "WHO پانی کی حفاظت کے رہنمائی",
          url: "https://who.int/water_sanitation_health/publications/drinking-water-quality-guidelines",
          snippet: "3-5 منٹ تک پانی ابالنا زیادہ تر پیتھوجنز کو مؤثر طریقے سے ختم کر دیتا ہے",
        },
        {
          title: "پاکستان واٹر کوالٹی اسٹینڈرڈز",
          url: "https://pcrwr.gov.pk/water-quality-standards",
          snippet: "محفوظ پینے کے پانی کے پیرامیٹرز کے لیے قومی معیارات",
        },
      ],
    },
    "flood water": {
      content:
        "سیلاب کا پانی انتہائی خطرناک ہے اور اسے کبھی استعمال نہیں کرنا چاہیے۔ اس میں سیوریج، کیمیکلز، اور ملبہ ہوتا ہے۔ سیلاب کے بعد، میونسپل پانی استعمال کرنے سے پہلے سرکاری اجازت کا انتظار کریں۔ بوتل کا پانی یا مناسب طریقے سے صاف شدہ متبادل استعمال کریں۔ استعمال سے پہلے کنوؤں اور اسٹوریج ٹینکس کو جراثیم کش کریں۔",
      citations: [
        {
          title: "NDMA سیلاب کی حفاظت کے رہنمائی",
          url: "https://ndma.gov.pk/flood-safety",
          snippet: "سیلاب کے دوران اور بعد میں پانی کی حفاظت کے لیے جامع رہنمائی",
        },
      ],
    },
    "brown water": {
      content:
        "بھورا یا رنگین پانی عام طور پر تلچھٹ، زنگ، یا نامیاتی مادے سے زیادہ گدلاہٹ کو ظاہر کرتا ہے۔ اگرچہ یہ ہمیشہ خطرناک نہیں ہوتا، لیکن اسے فلٹر اور ٹیسٹ کرنا چاہیے۔ عام وجوہات میں پائپ کا زنگ، تعمیراتی کام، یا قدرتی تلچھٹ شامل ہیں۔ اگر رنگ برقرار رہے تو اپنی واٹر اتھارٹی سے رابطہ کریں۔",
      citations: [
        {
          title: "پانی کی رنگت کی وجوہات",
          url: "https://example.com/water-discoloration",
          snippet: "مختلف قسم کی پانی کی رنگت اور ان کی وجوہات کو سمجھنا",
        },
      ],
    },
    testing: {
      content:
        "گھریلو پانی کی جانچ بنیادی پیرامیٹرز جیسے pH، کلورین، اور سختی کے لیے ٹیسٹ سٹرپس استعمال کر کے کی جا سکتی ہے۔ جامع جانچ کے لیے، تصدیق شدہ لیبارٹریز سے رابطہ کریں۔ بیکٹیریا، بھاری دھاتوں، اور کیمیائی آلودگی کے لیے ٹیسٹ کریں۔ باقاعدگی سے جانچ کی سفارش کی جاتی ہے، خاص طور پر نجی کنوؤں کے لیے۔",
      citations: [
        {
          title: "گھریلو پانی کی جانچ کا رہنما",
          url: "https://example.com/water-testing",
          snippet: "گھر میں پانی کی کوالٹی کی جانچ کے لیے قدم بہ قدم رہنمائی",
        },
      ],
    },
  },
}

function findRelevantContent(message: string, language: "en" | "ur" = "en") {
  const lowerMessage = message.toLowerCase()
  const kb = knowledgeBase[language]

  if (
    lowerMessage.includes("flood") ||
    lowerMessage.includes("hyderabad") ||
    lowerMessage.includes("سیلاب") ||
    lowerMessage.includes("حیدرآباد")
  ) {
    return kb["flood water"]
  }

  if (
    lowerMessage.includes("brown") ||
    lowerMessage.includes("discolor") ||
    lowerMessage.includes("turbid") ||
    lowerMessage.includes("بھورا") ||
    lowerMessage.includes("رنگ")
  ) {
    return kb["brown water"]
  }

  if (
    lowerMessage.includes("test") ||
    lowerMessage.includes("check") ||
    lowerMessage.includes("ٹیسٹ") ||
    lowerMessage.includes("چیک")
  ) {
    return kb["testing"]
  }

  // Default to general water safety
  return kb["water safety"]
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = "en" } = await request.json()

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const relevantContent = findRelevantContent(message, language)

    return NextResponse.json({
      content: relevantContent.content,
      citations: relevantContent.citations,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
