export default function RootPage() {
  // The root page is not a guest-facing route.
  // Guests should use /join/[slug] or /invite/[code].
  // For now, redirect to a placeholder or show a simple message.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mx-auto mb-6 h-px w-16 bg-gold/40" />
      <h1 className="font-serif text-3xl text-gold">Wedding Cards</h1>
      <p className="mt-3 font-sans text-sm text-muted-foreground">
        Welcome to the wedding invitation platform.
      </p>
      <p className="mt-2 font-sans text-xs text-muted-foreground">
        Please use your personalized invitation link to view your event.
      </p>
      <div className="mt-8 mx-auto h-px w-16 bg-gold/40" />
    </div>
  )
}