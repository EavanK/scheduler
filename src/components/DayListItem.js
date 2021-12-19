import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
	const { name, spots, setDay, selected } = props;
	const listClass = classNames("day-list__item", {
		"day-list__item--selected": selected,
		"day-list__item--full": spots === 0,
	});

	function format(spots) {
		if (!spots) return "no spots";
		if (spots === 1) return "1 spot";
		return `${spots} spots`;
	}

	return (
		<li className={listClass} onClick={() => setDay(name)} data-testid="day">
			<h2 className="text--regular">{name}</h2>
			<h3 className="text--light">{format(spots)} remaining</h3>
		</li>
	);
}
