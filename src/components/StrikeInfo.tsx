import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StrikeInfo() {
  return (
    <div className="space-y-8">
      {/* Strike Overview */}
      <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="destructive" className="text-sm px-4 py-2">
              ACTIVE STRIKE
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              Air Canada Flight Attendants Strike
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              CUPE-represented flight attendants walk off the job after eight months of failed negotiations, 
              affecting approximately 130,000 customers daily.
            </p>
          </div>
        </div>
      </Card>

      {/* Key Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">Strike Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date:</span>
              <span className="text-foreground font-medium">August 16, 2025, 1:00 AM ET</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Union:</span>
              <span className="text-foreground font-medium">CUPE (Canadian Union of Public Employees)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Affected Workers:</span>
              <span className="text-foreground font-medium">~10,000 Flight Attendants</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Impact:</span>
              <span className="text-foreground font-medium">130,000 customers affected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Flights Cancelled (Day 1):</span>
              <span className="text-foreground font-medium">~500 flights</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">Negotiation History</h3>
          <div className="space-y-3 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">Air Canada's Offer:</span>
              <span className="text-foreground font-medium block">38% total compensation increase over 4 years</span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Negotiation Period:</span>
              <span className="text-foreground font-medium block">8 months of failed talks</span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Main Dispute:</span>
              <span className="text-foreground font-medium block">Ground pay for required duties</span>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Union Position:</span>
              <span className="text-foreground font-medium block">Full pay for all working hours</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Impact Analysis */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">Economic Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-loss-red">500+</div>
            <div className="text-sm text-muted-foreground">Daily Flight Cancellations</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-loss-red">130K</div>
            <div className="text-sm text-muted-foreground">Daily Affected Passengers</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-loss-red">Peak Season</div>
            <div className="text-sm text-muted-foreground">Summer Travel Impact</div>
          </div>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            <strong>Broader Economic Effects:</strong> The shutdown poses significant risks to Canada's economy, 
            affecting tourism, trade, small businesses, and families during peak summer travel season. 
            Limited seat availability on alternate carriers compounds rebooking difficulties.
          </p>
        </div>
      </Card>

      {/* Operational Status */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">Operational Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Affected Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Air Canada mainline flights (suspended)</li>
              <li>• Air Canada Rouge flights (suspended)</li>
              <li>• Phased wind-down over 72 hours</li>
              <li>• Customer refunds and credits available</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Unaffected Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Air Canada Express (Jazz Airlines)</li>
              <li>• PAL Airlines regional services</li>
              <li>• Cargo operations (limited impact)</li>
              <li>• Aeroplan points remain valid</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}