import CanvasCard from '../components/CanvasCard'

function AssetLibrary() {
  const assets = [
    {
      title: 'Logos',
      items: [
        { label: 'Primary Logo', value: 'SVG' },
        { label: 'Icon Set', value: '240 icons' },
        { label: 'Wordmark', value: 'PNG + SVG' },
      ],
    },
    {
      title: 'Colors',
      items: [
        { label: 'Palette v1.0', value: '12 colors' },
        { label: 'Gradients', value: '8 gradients' },
        { label: 'Accessibility', value: 'WCAG AA' },
      ],
    },
    {
      title: 'Typography',
      items: [
        { label: 'Fonts', value: '3 typefaces' },
        { label: 'Scales', value: '8 sizes' },
        { label: 'Weights', value: '5 weights' },
      ],
    },
    {
      title: 'Components',
      items: [
        { label: 'Buttons', value: '12 variants' },
        { label: 'Cards', value: '8 types' },
        { label: 'Forms', value: '6 elements' },
      ],
    },
    {
      title: 'Photography',
      items: [
        { label: 'Stock Library', value: '500+ images' },
        { label: 'Product Photos', value: '120 shots' },
        { label: 'Portraits', value: '45 headshots' },
      ],
    },
    {
      title: 'Video',
      items: [
        { label: 'Demo Video', value: '4K 60fps' },
        { label: 'Promo Clips', value: '8 videos' },
        { label: 'Testimonials', value: '12 videos' },
      ],
    },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Asset Library</h1>
        <p className="reveal">Centralized brand and design asset management.</p>
      </section>

      <section className="section reveal">
        <div className="canvas-grid">
          {assets.map((section, index) => (
            <CanvasCard
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default AssetLibrary
