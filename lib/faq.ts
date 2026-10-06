import type { FaqItem } from "@/components/faq-section";

export const META_GUIDE_PATH = "/meta-ad-account-disabled-vs-restricted";

export const HOME_FAQ: FaqItem[] = [
  {
    q: "Is there a free tool to check a Google Ads or Meta ad account suspension notice?",
    a: "Yes. Ads Risk Check is free and needs no login. Paste the text of a Google Ads suspension or a Meta \"ad account disabled\" or \"restricted from advertising\" notice and it returns a HIGH, MED, or LOW card with the phrases it recognized, what they usually mean, and a next-step checklist. It is a fixed phrase list, not a model of Google or Meta, so it cannot predict whether an account will be reinstated.",
  },
  {
    q: "What is the difference between a disabled and a restricted Meta ad account?",
    a: "Restricted means Meta limited advertising on an asset: a person's profile, a Page, an ad account, or a business portfolio. That can be spend or payment limits, lost features, or no ads at all. Disabled is the ad-account outcome: the account and its ads are switched off, and Meta says it cannot be reactivated in place, so an admin has to request a review. A closed account is different again: you closed it, and you can reopen it yourself.",
  },
  {
    q: "How do I request a review of a disabled or restricted Meta ad account?",
    a: "On a computer, open Meta Business Support Home, go to Account overview, select the restricted or disabled account, and follow the What you can do section. Meta may ask you to confirm your identity or secure the account first. Only an admin on the account can select Request review. This site does not file reviews for you.",
  },
  {
    q: "How long do I have before a disabled Meta ad account can't be reinstated?",
    a: "Meta's Business Help Center says that if an ad account is disabled for a policy violation and stays ineligible for reinstatement for six months, it can no longer be reinstated, and Meta can disable an account permanently sooner in some cases. Check the date on your notice and act early.",
  },
  {
    q: "What does \"circumventing systems\" mean in a Google Ads suspension?",
    a: "It is the label Google uses for trying to get around a suspension or review, for example opening a new account, swapping domains, or hiding what reviewers see. It is one of the more serious suspension reasons, so the checker scores it HIGH. Do not open a replacement account; read Google's circumvention policy before you appeal.",
  },
  {
    q: "Is a disapproved ad the same as a suspended ad account?",
    a: "No. A disapproval usually applies to one ad or asset, and the account keeps running. A suspension (Google) or a disabled ad account (Meta) stops the whole account. Trust the noun in the email: ad, asset, or account.",
  },
  {
    q: "Should I open a new ad account after a suspension?",
    a: "No. Both Google and Meta treat a replacement account as circumvention, which usually makes things worse. Fix the problem the notice names and use the platform's own review or appeal form.",
  },
  {
    q: "Does Ads Risk Check store my notice or appeal for me?",
    a: "No. The page scores the text in your browser, and the API scores it in memory without storing it. It never logs into your Google or Meta account and it does not file appeals. Not legal advice, and not affiliated with Google or Meta.",
  },
  {
    q: "Is there an API or MCP server for AI agents?",
    a: "Yes. GET or POST https://ads-risk-check.vercel.app/api/score with a notice field returns the same card as JSON, with no key. The same check is a tool on the free Free Agent Tools MCP server at https://free-agent-tools.vercel.app/mcp.",
  },
];

export const META_FAQ: FaqItem[] = [
  {
    q: "What's the difference between a disabled and a restricted Meta ad account?",
    a: "A restriction limits advertising on an asset: a profile, a Page, an ad account, or a business portfolio. It can mean daily spend or payment limits, losing some features, or losing the ability to advertise. A disabled ad account is switched off for advertising, with its ads stopped, and Meta says it cannot be reactivated in place: an admin has to request a review in Business Support Home.",
  },
  {
    q: "Can a disabled Meta ad account be reactivated?",
    a: "Not with a Reactivate button. That button is for closed accounts you shut down yourself. For a disabled account, an admin requests a review in Meta Business Support Home, and Meta decides whether the restriction stays.",
  },
  {
    q: "How do I request a review for a restricted or disabled ad account?",
    a: "Open Meta Business Support Home on a computer, choose Account overview (or Account status overview), select the account, and follow What you can do. Meta may ask you to confirm your identity, complete verification, or secure the account. Only an admin can select Request review.",
  },
  {
    q: "How long do I have to appeal a disabled Meta ad account?",
    a: "Meta says an ad account disabled for a policy violation that stays ineligible for six months can no longer be reinstated, and unused prepaid funds may be forfeited where the law allows. Meta can also disable an account permanently sooner. Do not wait.",
  },
  {
    q: "Why was my Meta ad account disabled for unusual activity?",
    a: "Unusual or suspicious activity wording often means Meta thinks someone else got into the account or a payment looked risky. Change your password, turn on two-factor authentication, remove admins and payment methods you don't recognize, then follow the steps Meta lists before you request a review.",
  },
  {
    q: "If my profile or business portfolio is restricted, are my ad accounts affected?",
    a: "Often, yes. A person restricted from advertising can't create or run ads, and a restricted business portfolio can stop the ad accounts inside it. Check which asset the notice names before you change individual ads.",
  },
  {
    q: "Can I create a new ad account or business portfolio instead?",
    a: "Don't. Meta treats new accounts made to get around a restriction as circumvention, which can lead to more restrictions. Use the review flow instead.",
  },
  {
    q: "Is there a free tool to check a Meta restriction notice?",
    a: "Yes. Paste the notice into Ads Risk Check (free, no login) and it flags the phrases it knows, such as disabled ad account, restricted from advertising, unusual activity, billing, or circumvention, with a plain-language checklist. It cannot see your account and does not predict Meta's decision.",
  },
];
