import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { appendMatrix, parsePastedText } from "../../tables/import";
import { LIMITS } from "../../tables/schema";

/** Paste CSV / TSV / Markdown / JSON / HTML rows to append them to an existing table. */
const BulkAddModal = ({ open, onOpenChange, table, onApply }) => {
	const [text, setText] = useState("");
	const [header, setHeader] = useState(true);

	const result = useMemo(() => {
		if (!text.trim()) return null;
		try {
			const matrix = parsePastedText(text);
			const res = appendMatrix(table, matrix, { header });
			return { ...res, lines: matrix.length };
		} catch (e) {
			return { error: e.message };
		}
	}, [text, header, table]);

	const close = (o) => {
		onOpenChange(o);
		if (!o) setText("");
	};
	const apply = () => {
		if (!result || result.error || !result.added) return;
		onApply(result.table);
		toast.success(`Added ${result.added.toLocaleString()} rows`);
		close(false);
	};

	return (
		<Dialog open={open} onOpenChange={close}>
			<DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-xl grid-cols-1 overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add rows in bulk</DialogTitle>
					<DialogDescription>Paste rows (CSV, TSV, Markdown table, JSON or HTML) to append them to this table. Columns are matched by header name, or by position if there is no matching header.</DialogDescription>
				</DialogHeader>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder={`Paste rows here, e.g.\n${table.columns.slice(0, 3).map((c) => c.name).join(",")}`}
					spellCheck={false}
					className="h-48 w-full min-w-0 resize-none rounded-xl border bg-background p-3 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
				/>
				<div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
					<label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={header} onChange={(e) => setHeader(e.target.checked)} /> First row is the header</label>
					{result?.error ? (
						<span className="text-red-500">{result.error}</span>
					) : result ? (
						<span>
							{result.added.toLocaleString()} rows will be added
							{result.skipped > 0 && <span className="text-amber-600 dark:text-amber-400"> · {result.skipped.toLocaleString()} over the {LIMITS.ROWS.toLocaleString()} row limit</span>}
							{header && !result.matched && <span className="text-zinc-400"> · no matching headers, using column order</span>}
						</span>
					) : null}
				</div>
				<DialogFooter>
					<button type="button" onClick={apply} disabled={!result || result.error || !result.added} className="flex h-8 items-center rounded-xl border border-indigo-300 bg-indigo-50 px-4 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-40 dark:border-indigo-500/50 dark:bg-indigo-950/40 dark:text-indigo-200">Add rows</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default BulkAddModal;
