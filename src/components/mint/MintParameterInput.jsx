export default function MintParameterInput({

    input,

    value,

    onChange

}) {

    const type = input.type;

    /* ===========================
       ARRAY
    =========================== */

    if (type.endsWith("[]")) {

        return (

            <textarea

                rows={4}

                value={

                    Array.isArray(value)

                        ? value.join("\n")

                        : value || ""

                }

                onChange={(e) =>

                    onChange(

                        e.target.value

                            .split("\n")

                            .map(v => v.trim())

                            .filter(Boolean)

                    )

                }

                placeholder="Satu nilai per baris"

                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

        );

    }

    /* ===========================
       ADDRESS
    =========================== */

    if (type === "address") {

        return (

            <input

                type="text"

                value={value || ""}

                placeholder="0x..."

                onChange={(e) =>

                    onChange(

                        e.target.value

                    )

                }

                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

        );

    }

    /* ===========================
       BOOL
    =========================== */

    if (type === "bool") {

        return (

            <label className="flex items-center gap-3 text-white">

                <input

                    type="checkbox"

                    checked={Boolean(value)}

                    onChange={(e) =>

                        onChange(

                            e.target.checked

                        )

                    }

                />

                <span>

                    {Boolean(value) ? "True" : "False"}

                </span>

            </label>

        );

    }

    /* ===========================
       UINT / INT
    =========================== */

    if (

        type.startsWith("uint") ||

        type.startsWith("int")

    ) {

        return (

            <input

                type="number"

                value={value ?? ""}

                onChange={(e) =>

                    onChange(

                        e.target.value

                    )

                }

                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

        );

    }

    /* ===========================
       BYTES
    =========================== */

    if (

        type.startsWith("bytes")

    ) {

        return (

            <textarea

                rows={3}

                value={value || ""}

                placeholder="0x..."

                onChange={(e) =>

                    onChange(

                        e.target.value

                    )

                }

                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

        );

    }

    /* ===========================
       STRING
    =========================== */

    if (

        type === "string"

    ) {

        return (

            <input

                type="text"

                value={value || ""}

                onChange={(e) =>

                    onChange(

                        e.target.value

                    )

                }

                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

        );

    }

    /* ===========================
       DEFAULT
    =========================== */

    return (

        <input

            type="text"

            value={value || ""}

            onChange={(e) =>

                onChange(

                    e.target.value

                )

            }

            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

        />

    );

}