"use client";

import Image from "next/image";
import { useState } from "react";

export type Model = { img: string; tag: string; name: string; size: string; pieces: number; pages: number };
export type Sector = { id: string; label: string; models: Model[] };

/**
 * Modelos por setor: as abas trocam o setor e cada card já mostra embaixo o tamanho
 * montado, as peças e as páginas, sem precisar tocar no modelo para ver.
 */
export default function ModelExplorer({ sectors, imgBase }: { sectors: Sector[]; imgBase: string }) {
  const [active, setActive] = useState(sectors[0].id);
  const sector = sectors.find((s) => s.id === active) ?? sectors[0];

  return (
    <div>
      <div role="tablist" aria-label="Sectores de la ciudad" className="md-tabs">
        {sectors.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === active}
            onClick={() => setActive(s.id)}
            className="md-tab"
          >
            {s.label} · {s.models.length}
          </button>
        ))}
      </div>

      <ul role="tabpanel" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {sector.models.map((m) => (
          <li key={m.img} className="md-card">
            <div className="md-card-img">
              <Image src={`${imgBase}/${m.img}.svg`} alt={m.name} width={240} height={240} unoptimized />
            </div>
            <div className="flex flex-1 flex-col gap-1 px-3 pb-4 pt-3">
              <span className="md-tag">{m.tag}</span>
              <span className="font-display text-[17px] font-extrabold leading-tight text-sp-ink">{m.name}</span>
              <span className="mt-1 text-[13px] font-bold leading-snug text-sp-ink-soft">{m.size}</span>
              <span className="text-[13px] font-medium leading-snug text-sp-ink-soft">
                {m.pieces} piezas · {m.pages} páginas
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
