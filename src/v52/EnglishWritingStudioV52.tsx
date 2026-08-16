import { useMemo, useState } from "react"
import { CheckCircle2, AlertTriangle, FileText, RotateCcw, Copy, Check, Sparkles } from "lucide-react"

type WritingTemplate = {
  id: string
  name: string
  category: "pr" | "issue" | "adr" | "postmortem" | "rfc"
  initialText: string
  guidelines: string[]
}

const writingTemplates: WritingTemplate[] = [
  {
    id: "pull-request",
    name: "Pull Request Description (Google/GitHub standard)",
    category: "pr",
    initialText: `## Summary of Changes
- Refactored the authentication middleware to use asynchronous token verification.
- Added comprehensive unit tests covering expired and malformed JWT payloads.
- Updated the OpenAPI specification to reflect the new 401 response schema.

## Motivation & Context
Fixes #142. The synchronous verification previously blocked the event loop under heavy load.

## How Has This Been Tested?
- [x] Unit tests passed locally (\`npm test\`).
- [x] Integration test with mock Redis token store passed.
- [x] Verified zero memory leaks under load benchmark.

## Checklist
- [x] My code follows the project's architectural guidelines.
- [x] I have updated related documentation.`,
    guidelines: [
      "Use bullet points for clear scanning.",
      "Explain the 'why' (motivation), not just the 'what'.",
      "List explicit testing steps and validation criteria.",
    ],
  },
  {
    id: "bug-report",
    name: "Reproducible Bug Report / Issue",
    category: "issue",
    initialText: `## Description
The user profile endpoint throws a 500 Internal Server Error when the avatar URL contains query parameters.

## Steps to Reproduce
1. Send a POST request to \`/api/v1/users/profile\` with payload \`{"avatar": "https://cdn.example.com/img.png?size=large"}\`.
2. Inspect the server response code.

## Expected Behavior
The service should sanitize the URL, store the profile, and return 200 OK.

## Actual Behavior
Server returns 500 with stack trace: \`URIError: Malformed URI sequence at sanitizeUrl (url.ts:42)\`.

## Environment
- OS: Ubuntu 24.04 LTS
- Runtime: Node.js v20.11.0
- Service Version: v2.4.1`,
    guidelines: [
      "Provide deterministic steps to reproduce.",
      "Differentiate clearly between Expected vs Actual behavior.",
      "Include exact version numbers and sanitized stack traces.",
    ],
  },
  {
    id: "adr",
    name: "Architecture Decision Record (ADR)",
    category: "adr",
    initialText: `# ADR-014: Adopt PostgreSQL Partitioning for Audit Logs

## Status
Accepted (2026-08-15)

## Context
Our audit log table currently exceeds 500 million rows, causing sequential scans on date ranges to time out. We evaluated migrating to ClickHouse vs implementing native declarative partitioning in PostgreSQL.

## Decision
We will partition the \`audit_logs\` table by month using PostgreSQL declarative range partitioning.

## Consequences
### Positive
- Query latency for 30-day windows drops from 4.2s to 45ms.
- Old partitions can be detached and archived to cold storage with zero downtime.

### Negative / Trade-offs
- Foreign key constraints referencing partitions require composite keys.
- Application migrations must handle partition creation in advance.`,
    guidelines: [
      "State context and problem clearly.",
      "Document both positive and negative consequences (trade-offs).",
      "Explicitly mention evaluated alternatives.",
    ],
  },
  {
    id: "postmortem",
    name: "Blameless Incident Post-Mortem (SRE Standard)",
    category: "postmortem",
    initialText: `# Incident Post-Mortem: P0 Checkout Service Outage

**Date:** 2026-08-15 | **Author:** On-Call Reliability Team | **Status:** Completed

## Executive Summary
Between 14:15 UTC and 14:48 UTC (33 minutes), 42% of checkout transactions failed with HTTP 504 Gateway Timeout. The root cause was an exhausted connection pool caused by unindexed database queries introduced in release v3.4.0.

## Timeline (UTC)
- **14:15:** Release v3.4.0 deployed to production.
- **14:18:** PagerDuty alert triggered: P99 latency exceeded 2000ms.
- **14:24:** Incident Commander declared P0 and opened War Room.
- **14:35:** Rollback to v3.3.9 initiated.
- **14:48:** Rollback completed; error rate returned to baseline (0.01%).

## Root Cause
A newly added coupon verification query lacked an index on \`coupon_code\`, leading to sequential table locks under peak traffic.

## Action Items
1. [Preventative] Add mandatory linter rule blocking queries without supporting indexes (Owner: Alex, Due: Next sprint).
2. [Mitigation] Implement circuit breaker between checkout and coupon services (Owner: Maria, Due: Q3).`,
    guidelines: [
      "Focus on systemic causes, never individual blame.",
      "Construct a precise, timestamped timeline.",
      "Assign owners and deadlines to every action item.",
    ],
  },
]

export default function EnglishWritingStudioV52({
  initialContent = "",
  onUpdate,
}: {
  initialContent?: string
  onUpdate?: (text: string) => void
}) {
  const [content, setContent] = useState(initialContent || writingTemplates[0].initialText)
  const [copied, setCopied] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<string>(writingTemplates[0].id)

  const analysis = useMemo(() => {
    const text = content
    const words = text.trim().split(/\s+/).filter(Boolean)
    const wordCount = words.length

    // Passive voice heuristics
    const passiveMatches = text.match(/\b(is|are|was|were|be|been|being)\s+([a-z]+ed|[a-z]+en|found|written|made|built|run|sent|kept)\b/gi) || []

    // RFC 2119 normative keywords
    const rfcKeywords = (text.match(/\b(MUST|MUST NOT|REQUIRED|SHALL|SHALL NOT|SHOULD|SHOULD NOT|RECOMMENDED|MAY|OPTIONAL)\b/g) || [])

    // Vague pronouns at sentence start
    const vaguePronouns = (text.match(/(?:^|[.!?]\s+)(This|That|It)\s+(is|was|will|does|can|might)\b/g) || [])

    // Technical clarity terms
    const technicalTerms = (text.match(/\b(latency|throughput|scalability|reliability|invariant|partition|trade-off|middleware|endpoint|benchmark|concurrency|idempotent)\b/gi) || [])

    // Score calculation
    let score = 50
    if (wordCount >= 30) score += 15
    if (wordCount >= 60) score += 10
    if (technicalTerms.length >= 2) score += 15
    if (rfcKeywords.length >= 1 || text.includes("##")) score += 10
    if (passiveMatches.length > 4) score -= 10
    if (vaguePronouns.length > 2) score -= 5
    score = Math.max(10, Math.min(100, score))

    return {
      wordCount,
      passiveMatches,
      rfcKeywords,
      vaguePronouns,
      technicalTerms,
      score,
    }
  }, [content])

  const handleSelectTemplate = (template: WritingTemplate) => {
    setActiveTemplate(template.id)
    setContent(template.initialText)
    onUpdate?.(template.initialText)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setContent("")
    onUpdate?.("")
  }

  return (
    <div className="v52-writing-studio">
      <div className="v52-studio-topbar">
        <div className="v52-template-selector">
          <FileText size={16} />
          <span>Plantilla técnica:</span>
          <div className="v52-template-buttons">
            {writingTemplates.map((t) => (
              <button
                key={t.id}
                className={`v52-pill-btn ${activeTemplate === t.id ? "active" : ""}`}
                onClick={() => handleSelectTemplate(t)}
              >
                {t.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="v52-studio-actions">
          <button className="v52-action-btn" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copiado" : "Copiar"}
          </button>
          <button className="v52-action-btn subtle" onClick={handleClear}>
            <RotateCcw size={14} /> Limpiar
          </button>
        </div>
      </div>

      <div className="v52-studio-workspace">
        <div className="v52-editor-container">
          <textarea
            className="v52-writing-textarea"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              onUpdate?.(e.target.value)
            }}
            placeholder="Write your technical proposal, PR, issue, or ADR here in English..."
            rows={16}
          />
        </div>

        <div className="v52-analysis-panel">
          <div className="v52-score-banner">
            <div>
              <span className="v52-score-label">Google Technical Writing Score</span>
              <h3>{analysis.score}/100</h3>
            </div>
            <Sparkles className="v52-score-icon" />
          </div>

          <div className="v52-checklist">
            <h4>Checklist de Claridad & Estilo</h4>

            <div className={`v52-check-item ${analysis.wordCount >= 30 ? "ok" : ""}`}>
              <CheckCircle2 size={16} />
              <span>Extensión adecuada ({analysis.wordCount} palabras / mín. 30)</span>
            </div>

            <div className={`v52-check-item ${analysis.technicalTerms.length > 0 ? "ok" : ""}`}>
              <CheckCircle2 size={16} />
              <span>
                Vocabulario técnico ({analysis.technicalTerms.length} términos detectados)
              </span>
            </div>

            <div className={`v52-check-item ${analysis.passiveMatches.length <= 2 ? "ok" : "warn"}`}>
              {analysis.passiveMatches.length <= 2 ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
              <span>
                Uso de voz activa ({analysis.passiveMatches.length} frases pasivas detectadas)
              </span>
            </div>

            <div className={`v52-check-item ${analysis.vaguePronouns.length === 0 ? "ok" : "warn"}`}>
              {analysis.vaguePronouns.length === 0 ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
              <span>
                Evitar pronombres vagos ({analysis.vaguePronouns.length} inicios con "This/It is")
              </span>
            </div>

            <div className={`v52-check-item ${analysis.rfcKeywords.length > 0 ? "ok" : ""}`}>
              <CheckCircle2 size={16} />
              <span>
                Precisión RFC 2119 ({analysis.rfcKeywords.length} palabras clave normativas)
              </span>
            </div>
          </div>

          <div className="v52-guidelines-box">
            <h4>Guía para este documento:</h4>
            <ul>
              {writingTemplates
                .find((t) => t.id === activeTemplate)
                ?.guidelines.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
