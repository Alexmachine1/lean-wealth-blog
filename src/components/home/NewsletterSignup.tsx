export default function NewsletterSignup() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Get the good stuff in your inbox
        </h2>
        <p className="mt-2 text-muted">
          Weekly tips, real talk about money, and exclusive content you won&apos;t
          find on the blog.
        </p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          action="https://app.convertkit.com/forms/your-form-id/subscribe"
          method="POST"
          target="_blank"
        >
          <input
            type="email"
            name="email_address"
            placeholder="Enter your email"
            required
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-hidden"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-primary-dark hover:shadow-md"
          >
            Join Free
          </button>
        </form>
        <p className="mt-3 text-xs text-muted">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
