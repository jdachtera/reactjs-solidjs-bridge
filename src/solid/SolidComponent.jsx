const SolidComponent = ({
  children,
}) => (
  <fieldset>
    <div>
      Solid component.
    </div>

    {
      children
      ? (
        <div>
          with children.

          <fieldset>
            <h3>
              React children show up here:
            </h3>

            <div>
              {children}
            </div>
          </fieldset>
        </div>
      )
      : (
        <div>
          with no children.
        </div>
      )
    }
  </fieldset>
)

export default SolidComponent
