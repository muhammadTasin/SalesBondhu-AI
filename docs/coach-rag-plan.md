# Sales Coach (Gemini & RAG) Integration Plan

This document outlines the architecture, data sources, and behavioral guidelines for the upcoming AI Sales Coach (Copilot) feature.

## Architectural Security
- **No Direct Frontend Calls**: The Gemini API keys must never be exposed or called directly from the Vite/React frontend code.
- **Serverless/Backend Proxy**: All AI inference requests must go through a secure backend serverless function or API route.
- **API Endpoint**: The frontend will interact with the future endpoint:
  ```http
  POST /api/coach
  ```
  Request body structure:
  ```json
  {
    "dealerId": "string",
    "userMessage": "string",
    "visitContext": "object"
  }
  ```

## RAG (Retrieval-Augmented Generation) Data Sources
To provide highly context-aware recommendations, the backend Sales Coach service will retrieve and inject the following data sources into the system instructions and prompt context:
1. **Dealer Profile**: Basic store details, location, ownership, and relationship history.
2. **Dealer Metrics**: Outstanding balance, credit limit, monthly order history, and payment behavior.
3. **Visit History**: Notes, outcomes, competitor updates, and follow-up plans from past visits.
4. **Collection History**: Details of collections made, check bounces, and payment timelines.
5. **Product Opportunity**: Stock out history, recommended stock levels, and potential cross-selling opportunities.
6. **Manager Instructions**: Direct supervisor instructions or targets specifically set for the officer or the dealer.
7. **Company Sales Playbook**: Approved sales strategies, negotiation guides, product pitches, and promo structures.
8. **Bangla Tone Rules**: Rules for communicating with natural Bangladeshi field-sales vernacular (incorporating industry jargon and respectful local terminology).

## Personality & Behavioral Guidelines
1. **Bangladeshi Mentor Style**: The Sales Coach must respond like an experienced Bangladeshi field-sales manager/mentor (e.g., *“ভাই, রহমান ট্রেডার্স তো গত মাসে পেমেন্টে দেরি করেছিল, আজ বকেয়া আদায়ে জোর দিন...”*).
2. **No Hallucinations**: The coach must strictly rely on retrieved dealer context metrics and not hallucinate outstanding balances, invoice numbers, or targets.
3. **Contextual Awareness**: Always prioritize the active dealer context when responding to user requests.
4. **Actionable Bangla Talk-Tracks**: Provide practical script ideas, talking points, and negotiation strategies in simple, conversational Bangla.
