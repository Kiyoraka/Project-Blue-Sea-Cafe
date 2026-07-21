// app/analysis.js — sales analysis tab: hourly bars, daily summary, best sellers.

export const analysisTab = `
<sc-if value="{{ tabAnalysis }}">
  <div style="font-family:'Marcellus',serif;font-size:28px;color:#2E4A3C;margin-bottom:20px;">Sales analysis</div>
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;">
    <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:22px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:18px;">
        <div style="font-weight:500;">Hourly peak · today</div>
        <div style="color:#C1744E;font-weight:600;">{{ dailyTotalStr }}</div>
      </div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:180px;">
        <sc-for list="{{ hourBars }}" as="h">
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;">
            <div style="width:100%;height:{{ h.pct }};background:{{ h.color }};border-radius:3px 3px 0 0;" title="{{ h.amtStr }}"></div>
            <div style="font-size:11px;color:#7A8378;">{{ h.label }}</div>
          </div>
        </sc-for>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:20px;">
      <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:22px;">
        <div style="font-weight:500;margin-bottom:14px;">Daily summary</div>
        <sc-for list="{{ summaryRows }}" as="r">
          <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F0EADB;font-size:14px;">
            <span style="color:#7A8378;">{{ r.label }}</span><span style="font-weight:500;">{{ r.value }}</span>
          </div>
        </sc-for>
      </div>
      <div style="background:rgba(251,248,241,.72);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;padding:22px;">
        <div style="font-weight:500;margin-bottom:14px;">Best sellers</div>
        <sc-for list="{{ bestSellers }}" as="b">
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:4px;"><span>{{ b.name }}</span><span style="color:#7A8378;">{{ b.count }} sold</span></div>
            <div style="height:6px;background:#F0EADB;border-radius:3px;"><div style="height:6px;width:{{ b.pct }};background:#C1744E;border-radius:3px;"></div></div>
          </div>
        </sc-for>
      </div>
    </div>
  </div>
</sc-if>
`;
