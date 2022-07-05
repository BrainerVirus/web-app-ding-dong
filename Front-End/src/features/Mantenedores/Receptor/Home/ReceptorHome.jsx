import React from "react";
import adminHomeStyle from "./HomeReceptorStyle.module.scss";
import booststrap from "../../../../scss/Global/bootstrap.min.module.css";

function AdministradorHome() {
  return (
    // container-fluid flex-container no-padding
    <div
      className={`${booststrap["container-fluid"]} ${adminHomeStyle["flex-container"]} ${adminHomeStyle["no-padding"]}`}
      id="home-nav-link"
    >
      <section
        id="titulo"
        className={`${adminHomeStyle["header-section"]}  ${adminHomeStyle["section-funciones-black"]}`}
      >
        <div
          className={`${adminHomeStyle["custom-shape-divider-top-1656548389"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div
          className={`${adminHomeStyle["header"]} ${adminHomeStyle["span-2"]}`}
        >
          <div id="receptor-navbar-link"></div>
          <h1>
            "Ding Dong", la última exprenciencia de seguimiento de paquetes hoy"
          </h1>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div
          className={`${adminHomeStyle["custom-shape-divider-bottom-1656548343"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
      </section>
      <section
        className={`${adminHomeStyle["flex-container"]} ${adminHomeStyle["section-funciones-purple"]}`}
        id="funciones"
      >
        <div
          className={`${adminHomeStyle["custom-shape-divider-top-1656548389"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
        <div className={`${adminHomeStyle["grid-container"]}`}>
          <h2 className={`${adminHomeStyle["span-2"]}`}>Receptor</h2>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Validación de identidad</h4>
            <i
              className={`${
                adminHomeStyle["finger-print-icon"]
              } ${"fa-solid fa-fingerprint"}`}
            />
            <p>
              Valida tú identidad como receptor por medio de un sencillo código
              QR, el cual es generado en conjunto de la orden de envío
            </p>
          </div>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Reagendamiento de repartos</h4>
            <i
              className={`${
                adminHomeStyle["calendar-icon"]
              } ${"fa-solid fa-calendar-check"}`}
            />
            <p>
              Reangeda cualquier pedido como receptor con un limite de hasta de
              instancias, y recibe en el próximo día hábil más cercano.
            </p>
          </div>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Actualizaciones de estado en tiempo real</h4>
            <i
              className={`${adminHomeStyle["bell-icon"]} ${"fa-solid fa-bell"}`}
            />
            <p>
              Recibe notificaciones del estado de reparto de tú paquete como
              receptor con mayor ceterza, por medio de notificaciones de
              proximidad del paquete, cada que cambie su estado.
            </p>
          </div>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Calificaciones</h4>
            <i
              className={`${adminHomeStyle["star-icon"]} ${"fa-solid fa-star"}`}
            />
            <div id="repartidor-navbar-link"></div>
            <p>
              Puntua a los repartidores para generar clasificaciones, para
              ayudarnos a mejorar, y así poder obtener un mejor servicio.
            </p>
          </div>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div
          className={`${adminHomeStyle["custom-shape-divider-bottom-1656548343"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
      </section>
      <section
        className={`${adminHomeStyle["flex-container"]} ${adminHomeStyle["section-funciones-black"]}`}
      >
        <div
          className={`${adminHomeStyle["custom-shape-divider-top-1656548389"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div className={`${adminHomeStyle["grid-container"]}`}>
          <h2 className={`${adminHomeStyle["span-2"]}`}>Repartidor</h2>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Validación de identidad</h4>
            <i
              className={`${
                adminHomeStyle["finger-print-icon"]
              } ${"fa-solid fa-fingerprint"}`}
            />
            <p>
              Valida la idendidad de cualquier receptor de forma sencilla por
              medio de el escaneo de un código QR.
            </p>
          </div>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Generación rutas de reparto</h4>
            <i
              className={`${
                adminHomeStyle["routes-icon"]
              } ${"fa-solid fa-route"}`}
            />
            <div id="more-info-navbar-link"></div>
            <p>
              Accede como repartidor a rutas de reparto generadas
              aútomaticamente, obteniendo así una mayor eficiencia al momento de
              realizar un reparto.
            </p>
          </div>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Ajuste de ruta en tiempo real</h4>
            <i
              className={`${
                adminHomeStyle["time-icon"]
              } ${"fa-solid fa-hourglass"}`}
            />
            <p>
              Sigue como repartidor siempre la mejor ruta posible, por medio del
              sistema de reajuste de ruta, el cual se adapta al tráfico y al
              reagendamiento de paquetes de los receptores, de forma dinámica.
            </p>
          </div>
          <div className={`${adminHomeStyle["flex-container"]}`}>
            <h4>Gestión de movimiento de paquetes</h4>
            <i
              className={`${
                adminHomeStyle["parcel-icon"]
              } ${"fa-solid fa-box"}`}
            />
            <p>
              Marca como repartidor el recibimiento, y entrega de paquetes,
              sencillamente por medio del escaneo de códigos QR.
            </p>
          </div>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div
          className={`${adminHomeStyle["custom-shape-divider-bottom-1656548343"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
      </section>
      <section
        className={`${adminHomeStyle["flex-container"]} ${adminHomeStyle["section-funciones-purple"]}`}
        id="more-info"
      >
        <div
          className={`${adminHomeStyle["custom-shape-divider-top-1656548389"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div className={`${adminHomeStyle["grid-container"]}`}>
          <h1 className={`${adminHomeStyle["span-2"]}`}>Más información</h1>
          <p className={`${adminHomeStyle["span-2"]}`}>
            Ding dong es un módulo de gestión, y control de paquetes, respecto
            al último tramo de reparto de estos, que permite notificar a las
            receptores respecto al estado de su paquete desde el momento que
            este sale a reparto, hasta el momento justo antes de que este sea
            entregado, además de permitir el reagendamiento de estos. Ahora
            bien, aquello no es todo, puesto que de cara a los repartidores ding
            dong entrega rutas optimizadas de reparto, las cuales son generadas
            de forma dinámica al momento de que el paquete llegue a planta de
            destino, además entrega sistemas de control de movimiento de
            paquetes por medio de el escaneo de códigos QR.
          </p>
          <div id="contact-navbar-link"></div>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div
          className={`${adminHomeStyle["custom-shape-divider-bottom-1656548343"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
      </section>
      <section
        className={`${adminHomeStyle["flex-container"]} ${adminHomeStyle["section-funciones-black"]}`}
        id="contact-us"
      >
        <div
          className={`${adminHomeStyle["custom-shape-divider-top-1656548389"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div className={`${adminHomeStyle["grid-container"]}`}>
          <h1 className={`${adminHomeStyle["span-2"]}`}>Te interesa?</h1>
          <h2 className={`${adminHomeStyle["span-2"]}`}>
            Contactanos para conocer más de a nuestro servicio!
          </h2>
          <form className={`${adminHomeStyle["span-2"]}`}>
            <div className={`${"mb-3"}`}>
              <label htmlFor="exampleInputEmail1" className={`${"form-label"}`}>
                Email
              </label>
              <input
                type="email"
                className={`${"form-control"}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className={`${"mb-3"}`}>
              <label htmlFor="mssg" className={`${"form-label"}`}>
                Solicitud
              </label>
              <textarea
                className={`${"form-control"} ${
                  adminHomeStyle["contact-form-mssg"]
                }`}
                id="mssg"
              />
            </div>
            <button
              type="submit"
              className={`${"btn btn-primary"} ${adminHomeStyle["span-2"]} ${
                adminHomeStyle["custom-btn-primary"]
              }`}
            >
              Enviar
            </button>
          </form>
        </div>
        <div className={`${adminHomeStyle["divider"]}`}></div>
        <div
          className={`${adminHomeStyle["custom-shape-divider-bottom-footer-1656548343"]}`}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className={`${adminHomeStyle["shape-fill"]}`}
            ></path>
          </svg>
        </div>
        <a
          className={`${adminHomeStyle["nav-item-base-status"]} ${"nav-link"}`}
          aria-current="page"
          href="#home-nav-link"
        >
          <i
            className={`${
              adminHomeStyle["get-back-top"]
            } ${"fa-solid fa-circle-up"}`}
          />
        </a>
      </section>
    </div>
  );
}

export default AdministradorHome;
