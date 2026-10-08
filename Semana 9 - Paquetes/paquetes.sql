

--Vamos con la SPEC (COMO LA PÄRTE PUBLICA DEL PAQUETE)

CREATE OR REPLACE PACKAGE pkg_vender_entradas
AS 

    g_total_vendidas NUMBER := 0;

    FUNCTION fn_devolver_stock( p_localidad_evento_id IN NUMBER ) RETURN NUMBER;

    PROCEDURE sp_descontar_entradas( p_localidad_evento_id IN NUMBER, p_cantidad_entradas IN NUMBER );

END pkg_vender_entradas;
/

CREATE OR REPLACE PACKAGE BODY pkg_vender_entradas 
AS 

    FUNCTION fn_devolver_stock( p_localidad_evento_id IN NUMBER ) RETURN NUMBER
    AS 
        v_stock NUMBER;
    BEGIN 
        SELECT STOCK_DISPONIBLE INTO v_stock FROM LOCALIDAD_EVENTO WHERE LOCALIDAD_EVENTO_ID = p_localidad_evento_id ;

        RETURN v_stock;
    END fn_devolver_stock;

    PROCEDURE sp_descontar_entradas( p_localidad_evento_id IN NUMBER, p_cantidad_entradas IN NUMBER )
    AS 
        v_stock NUMBER;
    BEGIN 
       v_stock := fn_devolver_stock(p_localidad_evento_id);

        IF v_stock <= 0 THEN 
            RAISE_APPLICATION_ERROR(-20001, 'Entradas agotadas');
        END IF;

        UPDATE LOCALIDAD_EVENTO SET STOCK_DISPONIBLE = STOCK_DISPONIBLE - p_cantidad_entradas WHERE LOCALIDAD_EVENTO_ID = p_localidad_evento_id;

        COMMIT;

        g_total_vendidas := g_total_vendidas + p_cantidad_entradas;


    END sp_descontar_entradas;

END pkg_vender_entradas;
/


DECLARE 
BEGIN
    DBMS_OUTPUT.PUT_LINE('LA cantidad de entradas disponibles es '|| pkg_vender_entradas.FN_DEVOLVER_STOCK(1) );

    PKG_VENDER_ENTRADAS.SP_DESCONTAR_ENTRADAS(1, 1);

    DBMS_OUTPUT.PUT_LINE('El total de entradas vendidas es '|| pkg_vender_entradas.g_total_vendidas );

    DBMS_OUTPUT.PUT_LINE('LA cantidad de entradas disponibles ahora es '|| pkg_vender_entradas.FN_DEVOLVER_STOCK(1) );

END;
/