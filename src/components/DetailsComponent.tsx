
export default function DetailsComponent({ data }) {
  return (
    <div className="details">
      <h2 style={{ fontSize: '20px', textAlign: "left", fontWeight: 'lighter' }}>{data.display_name}</h2>
      {
        data.population &&
        <div className="population" style={{
          margin: '10px', gap: '3px'
          , paddingInline: '14px', paddingTop: '7px', paddingBottom: '7px', borderRadius: '30px'
        }}>
          Population : {data.population}
          {data.population_year &&
            <span>{"  "} as per year {data.population_year}</span>
          }
        </div>
      }
    </div>
  )
}
