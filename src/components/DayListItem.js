import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
	const { name, spots, setDay, selected } = props;
	const listClass = classNames("day-list__item", {
		"day-list__item--selected": selected,
		"day-list__item--full": spots === 0,
	});
	return (
		<li className={listClass} onClick={() => setDay(name)} data-testid="day">
			<h2 className="text--regular">{name}</h2>
			{!spots && <h3 className="text--light">no spots remaining</h3>}
			{spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
			{spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
		</li>
	);
}
