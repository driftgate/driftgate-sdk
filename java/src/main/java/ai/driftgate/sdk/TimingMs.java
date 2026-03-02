package ai.driftgate.sdk;

public final class TimingMs {
  public final double total;
  public final Double policy;
  public final Double route;
  public final Double tool;

  public TimingMs(double total, Double policy, Double route, Double tool) {
    this.total = total;
    this.policy = policy;
    this.route = route;
    this.tool = tool;
  }
}
