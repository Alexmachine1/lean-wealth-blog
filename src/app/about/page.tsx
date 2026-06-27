import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${SITE.name} and our mission to help women take control of their money and build wealth with intention.`,
};

export default function AboutPage() {
  return (
    <div className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          About {SITE.name}
        </h1>

        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Our Story
            </h2>
            <p className="mt-3">
              {SITE.name} started the way most good things do. Over coffee, between two
              women who were tired of feeling like money was something that
              happened to them instead of something they controlled.
            </p>
            <p className="mt-3">
              We had both been through it. The paycheck-to-paycheck cycle. The
              debt that felt permanent. The sinking feeling when an unexpected
              expense showed up and there was nothing to catch it with. And we
              were tired of being told the answer was just "make a budget" like
              that was some kind of revelation we had never considered.
            </p>
            <p className="mt-3">
              So we started sharing what actually worked for us. Not the
              theory. The messy, imperfect, real-life strategies that helped us
              dig out, build up, and breathe easier. And other women started
              resonating with it. Because it was real.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              What We Cover
            </h2>
            <p className="mt-3">
              Budgeting that does not make you want to cry. Frugal living that
              feels like a choice, not a punishment. Debt payoff strategies
              that account for the fact that you still need to live your life.
              Investing explained like you are a smart adult (because you are).
              And side hustles with real numbers attached, not vague promises.
            </p>
            <p className="mt-3">
              We also hunt down deals and cashback opportunities because
              leaving money on the table is uninteresting to us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Who This Is For
            </h2>
            <p className="mt-3">
              You, if you have ever Googled "how to save money" at 11pm. You,
              if you are tired of financial advice that assumes you have a
              finance degree or a six-figure salary. You, if you know you
              deserve to feel secure about money but are not sure how to get
              there from where you are right now.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Our Promise</h2>
            <p className="mt-3">
              We will never talk down to you. We will never make you feel bad
              about where you are. We will never recommend something we have
              not tried ourselves. And we will always, always give you real
              numbers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
