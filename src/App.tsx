import { Button } from "./components/Button";
import { Card } from "./components/Card";

function App() {
  return (
    <div className="App">
      <h1>Gerenciamento de Seleções - Copa 2022</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Card
          title="Brasil"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => alert("Ver Jogadores clicado")}
              >
                Ver Jogadores
              </Button>
              <Button variant="primary" onClick={() => alert("Editar clicado")}>
                Editar
              </Button>
            </>
          }
        >
          <p>{"Grupo G - Pontos: 9"}</p>
          <p>{"Titulos: 5 (1958, 1962, 1970, 1994, 2002)"}</p>
          <p>{"Jogadores-chave: Neymar, Alisson, Casemiro"}</p>
        </Card>

        <Card
          title="Argentina"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => alert("Ver Jogadores clicado")}
              >
                Ver Jogadores
              </Button>
              <Button variant="primary" onClick={() => alert("Editar clicado")}>
                Editar
              </Button>
            </>
          }
        >
          <p>{"Grupo C - Pontos: 6"}</p>
          <p>{"Titulos: 2 (1978, 1986)"}</p>
          <p>
            {"Jogadores-chave: Lionel Messi, Ángel Di María, Lautaro Martínez"}
          </p>
        </Card>

        <Card
          title="França"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => alert("Ver Jogadores clicado")}
              >
                Ver Jogadores
              </Button>
              <Button variant="primary" onClick={() => alert("Editar clicado")}>
                Editar
              </Button>
            </>
          }
        >
          <p>{"Grupo D - Pontos: 7"}</p>
          <p>{"Titulos: 2 (1998, 2018)"}</p>
          <p>
            {"Jogadores-chave: Kylian Mbappé, Antoine Griezmann, N'Golo Kanté"}
          </p>
        </Card>

        <Card
          title="Alemanha"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => alert("Ver Jogadores clicado")}
              >
                Ver Jogadores
              </Button>
              <Button variant="primary" onClick={() => alert("Editar clicado")}>
                Editar
              </Button>
            </>
          }
        >
          <p>{"Grupo E - Pontos: 4"}</p>
          <p>{"Titulos: 4 (1954, 1974, 1990, 2014)"}</p>
          <p>
            {"Jogadores-chave: Manuel Neuer, Thomas Müller, Joshua Kimmich"}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default App;
